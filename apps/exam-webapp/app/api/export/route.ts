/* eslint-disable turbo/no-undeclared-env-vars */
import dayjs from "dayjs";
import { prisma } from "../prismaClient";
import { NextResponse } from "next/server";

import sgMail from "@sendgrid/mail";

// eslint-disable-next-line turbo/no-undeclared-env-vars
sgMail.setApiKey(process?.env?.SEND_GRID_API_KEY ?? "");

import { Question, SessionUser } from "database";
import { sendErrorResponse } from "../errorResponse";

import isoWeek from "dayjs/plugin/isoWeek";
import {
	capitalizeEachLetter,
	capitalizeFirstLetter,
	mapAnswerToFriendlyLabel,
	mapRoleToFriendlyDisplayLabel
} from "@repo/utilities";

// Override the Correct and Users Answer fields, the types don't match up we want it to be a string whereas in the db it's an eum
type QuestionWithoutCorrectAnswerOrUserAnswer = Pick<Question, "id" | "order" | "youtube_id" | "session_user_id"> & {
	CorrectAnswer: string | null;
	UsersAnswer: string | null;
	created_at: string;
};

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
	let question: QuestionWithoutCorrectAnswerOrUserAnswer = {
		id: incomingQuestion.id,
		order: incomingQuestion.order,
		session_user_id: incomingQuestion.session_user_id,
		youtube_id: incomingQuestion.youtube_id,
		created_at: dayjs(incomingQuestion.created_at).format("DD/MM/YYYY"),
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

const getUserRow = (incomingUser: SessionUser) => {
	const user: Omit<SessionUser, "created_at" | "UsersPrimaryRole"> & { created_at: string; UsersPrimaryRole: string } =
		{
			...incomingUser,
			created_at: dayjs(incomingUser?.created_at).format("DD/MM/YYYY"),
			UsersPrimaryRole: mapRoleToFriendlyDisplayLabel(incomingUser.UsersPrimaryRole)
		};

	return user;
};

const convertToCSV = (data: Array<Array<unknown>>) => {
	const csvRows = [];
	for (const row of data) {
		const csvColumns = [];
		for (const column of row) {
			csvColumns.push(`"${column}"`);
		}
		csvRows.push(csvColumns.join(","));
	}
	return csvRows.join("\n");
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

	// Users worksheet
	const usersWorksheetColumns: string[] = [];
	const usersWorksheetRows: Array<string | null | number | boolean>[] = [];

	// Questions worksheet
	const questionsWorksheetColumns: string[] = [];
	const questionsWorksheetRows: Array<string | null | number>[] = [];

	// Create the columns for the csv files

	getObjectKeys(prisma.sessionUser.fields).forEach((sessionUserModelKey) => {
		usersWorksheetColumns.push(getUserWorksheetColumnTitle(sessionUserModelKey));
	});

	getObjectKeys(prisma.question.fields).forEach((questionModelKey) => {
		questionsWorksheetColumns.push(getQuestionsWorksheetColumnTitle(questionModelKey));
	});

	// For each object property add

	usersCreatedInThePreviousWeek?.forEach((userCreatedInThePreviousWeek) => {
		// Transform the question into a readable format
		const row = getUserRow(userCreatedInThePreviousWeek);

		// Get all the available keys for the object
		const keys = getObjectKeys(row);

		const csvRow: Array<string | null | number | boolean> = [];

		// Loop through all the keys and add them to the csvRow e.g. [['Alex', 'Machin']]
		keys?.forEach((key) => {
			csvRow.push(row[key]);
		});

		// Append the row to the csv rows variable
		usersWorksheetRows.push(csvRow);
	});

	questionsInThePreviousWeek?.forEach((questionInThePreviousWeek) => {
		// Transform the question into a readable format
		const row = getQuestionRow(questionInThePreviousWeek);

		// Get all the available keys for the object
		const keys = getObjectKeys(row);

		const csvRow: Array<string | null | number> = [];

		// Loop through all the keys and add them to the csvRow e.g. [['Alex', 'Machin']]
		keys?.forEach((key) => {
			csvRow.push(row[key]);
		});

		// Append the row to the csv rows variable
		questionsWorksheetRows.push(csvRow);
	});

	// Attempt to send the email to a specified user
	try {
		await sgMail.send({
			to: process.env.SEND_GRID_TO_EMAIL_ADDRESS,
			from: process.env.SEND_GRID_FROM_EMAIL_ADDRESS,
			subject: `Weekly exports for RoMS examination results`,
			html: `Attached in this email are the examination results for ${gte.format("DD-MM-YYYY")} to ${lte.format("DD-MM-YYYY")}`,
			attachments: [
				{
					content: btoa(convertToCSV([usersWorksheetColumns, ...(usersWorksheetRows ?? [])])),
					filename: `weekly-users-RoMS-report-for-${lte.format("DD-MM-YYYY")}.csv`,
					disposition: "attachment",
					type: "application/csv"
				},
				{
					content: btoa(convertToCSV([questionsWorksheetColumns, ...(questionsWorksheetRows ?? [])])),
					filename: `weekly-questions-RoMS-report-for-${lte.format("DD-MM-YYYY")}.csv`,
					disposition: "attachment",
					type: "application/csv"
				}
			]
		});
	} catch {
		return sendErrorResponse({
			errorMessage: "Something went wrong sending the email",
			statusCode: 500
		});
	}

	// // Attempt to remove the old file as it's no longer needed
	// try {
	// 	await unlink(fileName);

	// 	console.log("Successfully deleted the file");
	// } catch {
	// 	return sendErrorResponse({
	// 		errorMessage: "Failed to cleanup the existing file",
	// 		statusCode: 500
	// 	});
	// }

	return NextResponse.json({
		message: `Successfully generated the report named`
	});
};
