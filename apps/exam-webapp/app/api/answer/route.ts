import { nativeEnum, object, string } from "zod";
import { sendErrorResponse } from "../errorResponse";
import { PrismaClient, AnswerOption } from "database";

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

enum Outcome {
	SOUND,
	LAME
}

const mapScoreToOutcome = (score: AnswerOption): Outcome => {
	if (score === AnswerOption.GOOD || score === AnswerOption.IMPERFECT) {
		return Outcome.SOUND;
	}

	return Outcome.LAME;
};

const getScoreToIncrement = ({
	usersAnswer,
	correctAnswer
}: {
	usersAnswer: AnswerOption;
	correctAnswer: AnswerOption;
}) => {
	const usersAnswerOutcome = mapScoreToOutcome(usersAnswer);
	console.log("usersAnswerOutcome", usersAnswerOutcome);

	const correctAnswerOutcome = mapScoreToOutcome(correctAnswer);
	console.log("correctAnswerOutcome", correctAnswerOutcome);

	if (correctAnswerOutcome === Outcome.LAME && usersAnswerOutcome === Outcome.LAME) return "true_positive";
	if (correctAnswerOutcome === Outcome.LAME && usersAnswerOutcome === Outcome.SOUND) return "false_negative";
	if (correctAnswerOutcome === Outcome.SOUND && usersAnswerOutcome === Outcome.LAME) return "false_positive";
	if (correctAnswerOutcome === Outcome.SOUND && usersAnswerOutcome === Outcome.SOUND) return "true_negative";
	return "true_negative";
};

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

		const scoreToIncrement = getScoreToIncrement({
			usersAnswer: validatedAnswer.usersAnswer,
			correctAnswer: existingQuestion.CorrectAnswer
		});
		console.log("scoreToIncrement", scoreToIncrement);

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
