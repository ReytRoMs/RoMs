import { get } from "@vercel/edge-config";
import { sendErrorResponse } from "../errorResponse";
import { PrismaClient, Question } from "@prisma/client";
import { VideoData } from "@/types";
import { NextResponse } from "next/server";
import { string } from "zod";

const prisma = new PrismaClient();

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

export const GET = async (request: Request) => {
	const ERROR_MESSAGE = "Error getting results";
	try {
		const url = new URL(request.url);
		const params = new URLSearchParams(url.search);
		const sessionUserId = params.get("sessionUserId");

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

		const usersResults = scoreUsersAnswers({ usersAnsweredQuestions, videoData });

		return NextResponse.json(usersResults);
	} catch (err) {
		const errorReasons = [err.message];

		return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 500 });
	}
};
