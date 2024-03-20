/* eslint-disable turbo/no-undeclared-env-vars */
import dayjs from "dayjs";
import { prisma } from "../prismaClient";
import { NextResponse } from "next/server";
import Excel from "exceljs";

import sgMail from "@sendgrid/mail";

// eslint-disable-next-line turbo/no-undeclared-env-vars
sgMail.setApiKey(process?.env?.SEND_GRID_API_KEY ?? "");

import { readFile, unlink } from "fs/promises";
import { Question, SessionUser } from "database";
import { sendErrorResponse } from "../errorResponse";

import isoWeek from "dayjs/plugin/isoWeek";
import {
	capitalizeEachLetter,
	capitalizeFirstLetter,
	mapAnswerToFriendlyLabel,
	mapRoleToFriendlyDisplayLabel
} from "@repo/utilities";

dayjs.extend(isoWeek);

const getObjectKeys = <Obj extends object>(obj: Obj): (keyof Obj)[] => {
	return Object.keys(obj) as (keyof Obj)[];
};

const getUserWorksheetColumnTitle = (key: keyof SessionUser) => {
	switch (key) {
		case "id": {
			return "Id";
		}

		case "is_current_roms_member": {
			return "Is RoMS current member";
		}

		case "UsersPrimaryRole": {
			return "User's Primary Role";
		}

		case "false_negative":
		case "false_positive":
		case "true_negative":
		case "true_positive": {
			return capitalizeEachLetter(key.split("_"))?.join(" ");
		}

		default: {
			return key;
		}
	}
};

const getQuestionsWorksheetColumnTitle = (key: keyof Question) => {
	switch (key) {
		case "CorrectAnswer": {
			return "Correct Answer";
		}

		case "UsersAnswer": {
			return "User's Answer";
		}

		case "created_at":
		case "session_user_id":
		case "youtube_id": {
			return capitalizeEachLetter(key.split("_"))?.join(" ");
		}

		case "order":
		case "id": {
			return capitalizeFirstLetter(key);
		}

		default: {
			return key;
		}
	}
};

const getQuestionRow = (incomingQuestion: Question) => {
	// Override the Correct and Users Answer fields, the types don't match up we want it to be a string whereas in the db it's an eum
	type QuestionWithoutCorrectAnswerOrUserAnswer = Pick<
		Question,
		"id" | "order" | "youtube_id" | "session_user_id" | "created_at"
	> & {
		CorrectAnswer?: string | null;
		UsersAnswer?: string | null;
	};

	let question: QuestionWithoutCorrectAnswerOrUserAnswer = {
		...incomingQuestion,
		UsersAnswer: null,
		CorrectAnswer: null
	};

	// If the users answer is available map the value to a friendly label output
	if ((incomingQuestion?.UsersAnswer ?? null) !== null) {
		question = {
			...question,
			UsersAnswer: mapAnswerToFriendlyLabel(incomingQuestion?.UsersAnswer)
		};
	}

	// If the correct answer is available map the value to a friendly label output
	if ((incomingQuestion?.CorrectAnswer ?? null) !== null) {
		question = {
			...question,
			CorrectAnswer: mapAnswerToFriendlyLabel(incomingQuestion?.CorrectAnswer)
		};
	}

	return question;
};

export const revalidate = 0;

export const GET = async () => {
	console.log("Running /api/export endpoint.......");

	const lastWeek = dayjs().subtract(7, "days");
	const gte = dayjs(lastWeek).startOf("isoWeek");
	const lte = dayjs(lastWeek).endOf("isoWeek");

	let usersCreatedInThePreviousWeek: SessionUser[] = [];
	let questionsInThePreviousWeek: Question[] = [];

	try {
		usersCreatedInThePreviousWeek = await prisma.sessionUser.findMany({
			where: {
				created_at: {
					gte: gte.toDate(), // Start of date range
					lte: lte.toDate() // End of date range
				}
			},
			orderBy: {
				created_at: "asc"
			}
		});
	} catch {
		return sendErrorResponse({
			errorMessage: `Failed to fetch the users created in the previous week`,
			statusCode: 500
		});
	}

	try {
		questionsInThePreviousWeek = await prisma.question.findMany({
			where: {
				created_at: {
					gte: gte.toDate(), // Start of date range
					lte: lte.toDate() // End of date range
				}
			},
			orderBy: {
				order: "asc"
			}
		});
	} catch {
		return sendErrorResponse({
			errorMessage: `Failed to fetch the questions created in the previous week`,
			statusCode: 500
		});
	}

	// Create a new Excel Workbook document
	const workbook = new Excel.Workbook();

	// Users worksheet
	const usersWorksheet = workbook.addWorksheet("Users", {});
	const usersWorksheetColumns: Partial<Excel.Column>[] = [];

	// Questions worksheet
	const questionsWorksheet = workbook.addWorksheet("Questions", {});
	const questionsWorksheetColumns: Partial<Excel.Column>[] = [];

	// For each SessionUser model property add a column e.g. [{header: "Example header", key: "example_property"}]
	// NOTE: The key value must correspond to the model property so it can correctly map the data
	getObjectKeys(prisma.sessionUser.fields).forEach((sessionUserModelKey) => {
		usersWorksheetColumns.push({
			header: getUserWorksheetColumnTitle(sessionUserModelKey),
			key: sessionUserModelKey
		});
	});

	// For each SessionUser model property add a column e.g. [{header: "Example header", key: "example_property"}]
	// NOTE: The key value must correspond to the model property so it can correctly map the data
	getObjectKeys(prisma.question.fields).forEach((questionModelKey) => {
		questionsWorksheetColumns.push({
			header: getQuestionsWorksheetColumnTitle(questionModelKey),
			key: questionModelKey
		});
	});

	// Append the questions related data to the "Questions" worksheet
	usersWorksheet.columns = usersWorksheetColumns;
	usersWorksheet.addRows(
		usersCreatedInThePreviousWeek?.map((value) => ({
			...value,
			UsersPrimaryRole: mapRoleToFriendlyDisplayLabel(value.UsersPrimaryRole)
		}))
	);

	// Append the questions related data to the "Answers" worksheet
	questionsWorksheet.columns = questionsWorksheetColumns;
	questionsWorksheet.addRows(questionsInThePreviousWeek?.map((question) => getQuestionRow(question)));

	// File name e.g. weekly-RoMS-report-for-18-03-2024.xlsx
	const fileName = `public/weekly-RoMS-report-for-${lte.format("DD-MM-YYYY")}.xlsx`;

	// Will store the file attach that will go with the email
	let fileAttachment = null;

	// Attempt to write the Excel document to storage
	try {
		const writtenFile = await workbook.xlsx.writeFile(fileName);

		console.log("Successfully wrote the file", writtenFile);
	} catch (err: unknown) {
		console.log("failed to save", err);
		return sendErrorResponse({ errorMessage: `Failed to save ${fileName}`, statusCode: 500 });
	}

	// Attempt to read the Excel document, the format is base64 as that what attachments should be for the send-grid api
	try {
		fileAttachment = await readFile(fileName, "base64");

		console.log("Successfully read the file");
	} catch {
		return sendErrorResponse({ errorMessage: `Failed to read ${fileName}`, statusCode: 500 });
	}

	// Make sure the fileAttachment has been re-assigned with contents of an actual file
	if (fileAttachment === null) {
		return sendErrorResponse({
			errorMessage: "Attachments can't be empty, looks like something went wrong",
			statusCode: 500
		});
	}

	// Attempt to send the email to a specified user
	try {
		await sgMail.send({
			to: process.env.SEND_GRID_TO_EMAIL_ADDRESS,
			from: process.env.SEND_GRID_FROM_EMAIL_ADDRESS,
			subject: `Weekly export for RoMS examination results`,
			html: `Attached in this email are the examination results for ${gte.format("DD-MM-YYYY")} to ${lte.format("DD-MM-YYYY")}`,
			attachments: [
				{
					filename: fileName,
					content: fileAttachment,
					disposition: "attachment",
					type: "text/html"
				}
			]
		});

		console.log("Send grid sent the email successfully", {
			to: process.env.SEND_GRID_TO_EMAIL_ADDRESS,
			from: process.env.SEND_GRID_FROM_EMAIL_ADDRESS,
			subject: `Weekly export for RoMS examination results`,
			html: `Attached in this email are the examination results for ${gte.format("DD-MM-YYYY")} to ${lte.format("DD-MM-YYYY")}`,
			attachments: [
				{
					filename: fileName,
					content: fileAttachment,
					disposition: "attachment",
					type: "text/html"
				}
			]
		});
	} catch {
		return sendErrorResponse({
			errorMessage: "Something went wrong sending the email",
			statusCode: 500
		});
	}

	// Attempt to remove the old file as it's no longer needed
	try {
		await unlink(fileName);

		console.log("Successfully deleted the file");
	} catch {
		return sendErrorResponse({
			errorMessage: "Failed to cleanup the existing file",
			statusCode: 500
		});
	}

	return NextResponse.json({
		message: `Successfully generated the report named ${fileName}`
	});
};
