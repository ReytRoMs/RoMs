import { nativeEnum, object, string } from "zod";
import { sendErrorResponse } from "../errorResponse";
import { PrismaClient, AnswerOption } from "database";

import { getClassificationToBeIncremented } from "algorithm";

const prisma = new PrismaClient();

const questionAnswerSchema = object({
	questionId: string({ required_error: "Question ID is required" }).uuid({ message: "Invalid question ID" }),
	usersAnswer: nativeEnum(AnswerOption, {
		errorMap: (issue) => {
			// @ts-expect-error - Zod gives us this issue.received but apparently doesn't know about it!
			if (issue.received === "undefined") {
				return { message: "Answer is required" };
			}

			return { message: "Invalid answer" };
		}
	})
});

export async function POST(request: Request) {
	const ERROR_MESSAGE = "Error saving answer";

	try {
		const data = await request.json();
		const validationResult = questionAnswerSchema.safeParse(data);

		if (!validationResult.success) {
			const errorReasons = validationResult.error.issues.map((err) => err.message);
			return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 403 });
		}

		const { data: validatedAnswer } = validationResult;

		const existingQuestion = await prisma.question.findUniqueOrThrow({
			where: { id: validatedAnswer.questionId }
		});

		if (existingQuestion.UsersAnswer) {
			const errorReasons = ["This question has already been answered"];
			return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 403 });
		}

		const createdAnswer = await prisma.question.update({
			where: { id: validatedAnswer.questionId },
			data: {
				UsersAnswer: validatedAnswer.usersAnswer
			}
		});

		if (!createdAnswer) {
			const errorReasons = ["Failed to save question answer"];
			return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 500 });
		}

		const scoreToIncrement = getClassificationToBeIncremented({
			usersAnswer: validatedAnswer.usersAnswer,
			correctAnswer: existingQuestion.CorrectAnswer
		});

		await prisma.sessionUser.update({
			where: { id: createdAnswer.session_user_id },
			data: { [scoreToIncrement]: { increment: 1 } }
		});

		// 204 not implemented yet for NextResponse
		return new Response(null, { status: 204 });
	} catch (err) {
		const errorReasons = [err.message];
		return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 500 });
	}
}
