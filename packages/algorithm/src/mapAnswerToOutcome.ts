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
