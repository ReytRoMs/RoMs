import { AnswerOption } from "database";

enum Outcome {
	SOUND,
	LAME
}

export const mapAnswerToOutcome = (score: AnswerOption): Outcome => {
	if (score === AnswerOption.GOOD || score === AnswerOption.IMPERFECT) {
		return Outcome.SOUND;
	}

	return Outcome.LAME;
};

export const getScoreToBeIncremented = ({
	usersAnswer,
	correctAnswer
}: {
	usersAnswer: AnswerOption;
	correctAnswer: AnswerOption;
}) => {
	const usersAnswerOutcome = mapAnswerToOutcome(usersAnswer);
	const correctAnswerOutcome = mapAnswerToOutcome(correctAnswer);

	if (correctAnswerOutcome === Outcome.LAME && usersAnswerOutcome === Outcome.LAME) return "true_positive";
	if (correctAnswerOutcome === Outcome.LAME && usersAnswerOutcome === Outcome.SOUND) return "false_negative";
	if (correctAnswerOutcome === Outcome.SOUND && usersAnswerOutcome === Outcome.LAME) return "false_positive";
	if (correctAnswerOutcome === Outcome.SOUND && usersAnswerOutcome === Outcome.SOUND) return "true_negative";
	return "true_negative";
};
