import { NextResponse } from "next/server";
import { sendErrorResponse } from "../errorResponse";
import { PrismaClient } from "@prisma/client";
import { string } from "zod";

const prisma = new PrismaClient();

const sessionUserIdSchema = string().uuid({ message: "Invalid session user ID" });

export const GET = async (request: Request) => {
	const ERROR_MESSAGE = "Error getting question";

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

		const totalQuestionsCount = await prisma.question.count({
			where: {
				session_user_id: sessionUserId
			}
		});

		if (totalQuestionsCount === 0) {
			const errorReasons = [`No questions found for session user: ${sessionUserId}`];

			return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 403 });
		}

		const foundNextQuestion = await prisma.question.findFirst({
			where: {
				session_user_id: sessionUserId,
				UsersAnswer: null
			},
			orderBy: { order: "asc" }
		});

		if (!foundNextQuestion) {
			const answeredQuestionCount = await prisma.question.count({
				where: {
					session_user_id: sessionUserId,
					UsersAnswer: { not: null }
				},
				orderBy: { order: "asc" }
			});

			const allQuestionsAreAnswered = answeredQuestionCount === totalQuestionsCount;
			if (allQuestionsAreAnswered) {
				// handle redirect to results page
				return NextResponse.json({ allQuestionsAreAnswered: true });
			} else {
				const errorReasons = [`No question found for session user: ${sessionUserId}`];
				return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 403 });
			}
		}

		const formattedNextQuestion = {
			questionId: foundNextQuestion?.id,
			youtubeId: foundNextQuestion?.youtube_id,
			allQuestionsAreAnswered: false,
			order: foundNextQuestion?.order,
			total: totalQuestionsCount
		};

		return NextResponse.json(formattedNextQuestion);
	} catch (err) {
		const errorReasons = [err.message];

		return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 500 });
	}
};
