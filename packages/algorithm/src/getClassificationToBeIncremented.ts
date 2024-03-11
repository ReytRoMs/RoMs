import { AnswerOption } from "database";
import { mapAnswerToOutcome } from "./mapAnswerToOutcome";
import { Classifications } from "./types";

enum Outcome {
	SOUND,
	LAME
}

export const getClassificationToBeIncremented = ({
	usersAnswer,
	correctAnswer
}: {
	usersAnswer: AnswerOption;
	correctAnswer: AnswerOption;
}) => {
	const usersAnswerOutcome = mapAnswerToOutcome(usersAnswer);
	const correctAnswerOutcome = mapAnswerToOutcome(correctAnswer);

	if (correctAnswerOutcome === Outcome.LAME && usersAnswerOutcome === Outcome.LAME)
		return Classifications.true_positive;

	if (correctAnswerOutcome === Outcome.LAME && usersAnswerOutcome === Outcome.SOUND)
		return Classifications.false_negative;

	if (correctAnswerOutcome === Outcome.SOUND && usersAnswerOutcome === Outcome.LAME)
		return Classifications.false_positive;

	if (correctAnswerOutcome === Outcome.SOUND && usersAnswerOutcome === Outcome.SOUND)
		return Classifications.true_negative;

	return Classifications.true_negative;
};
