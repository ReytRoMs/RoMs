import { get } from "@vercel/edge-config";
import { sendErrorResponse } from "../errorResponse";
import { Question } from "database";
import { VideoData } from "@/types";
import { NextResponse } from "next/server";
import { string } from "zod";
import { cookies } from "next/headers";
import { USER_SESSION_ID_KEY_NAME } from "../constants";
import { prisma } from "../prismaClient";
import { IResultsTableData } from "@repo/types";

const scoreUsersAnswers = ({
	usersAnsweredQuestions,
	videoData
}: {
	usersAnsweredQuestions: Question[];
	videoData: readonly VideoData[];
}) => {
	const usersResults = usersAnsweredQuestions.map((usersQuestion) => {
		const correctAnswer = videoData.find((video) => usersQuestion.youtube_id === video.youtube_id)?.correct_answer;

		return {
			youtubeId: usersQuestion.youtube_id,
			usersAnswer: usersQuestion.UsersAnswer,
			correctAnswer
		};
	});

	return usersResults;
};

const sessionUserIdSchema = string().uuid({ message: "Invalid session user ID" });

export const GET = async () => {
	const ERROR_MESSAGE = "Error getting results";
	try {
		const sessionUserId = cookies().get(USER_SESSION_ID_KEY_NAME)?.value;

		if (!sessionUserId) {
			const errorReasons = ["No session user ID"];
			return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 403 });
		}

		const validationResult = sessionUserIdSchema.safeParse(sessionUserId);
		if (!validationResult.success) {
			const errorReasons = validationResult.error.issues.map((err) => err.message);
			return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 403 });
		}

		await prisma.sessionUser.findUniqueOrThrow({ where: { id: sessionUserId } });

		const usersQuestionsCount = await prisma.question.count({
			where: { session_user_id: sessionUserId }
		});

		const usersAnsweredQuestions = await prisma.question.findMany({
			where: {
				session_user_id: sessionUserId,
				UsersAnswer: { not: null }
			}
		});

		if (usersAnsweredQuestions.length !== usersQuestionsCount) {
			const errorReasons = [
				`Only ${usersAnsweredQuestions.length} of ${usersQuestionsCount} questions are answered for user: ${sessionUserId}`
			];
			return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 403 });
		}

		const videoData = await get<VideoData[]>("videos");

		if (!videoData?.length) {
			const errorReasons = ["Error fetching video data"];
			return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 503 });
		}

		// Get the results table data
		const results = scoreUsersAnswers({ usersAnsweredQuestions, videoData });

		// Get the count of all the questions that the user answer correctly
		const numberOfCorrectAnswers = results?.filter(
			(question) => question.correctAnswer === question.usersAnswer
		)?.length;

		const data: IResultsTableData = {
			results,
			totalNumberOfQuestions: usersQuestionsCount,
			totalNumberOfCorrectAnswers: numberOfCorrectAnswers,
			percentageCorrect: Math.round(100 - ((usersQuestionsCount - numberOfCorrectAnswers) / usersQuestionsCount) * 100) // 100 - ((20 - 18) / 20) * 100 = 90%
		};

		return NextResponse.json(data);
	} catch (err) {
		const errorReasons = [err.message];

		return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 500 });
	}
};
