import { AnswerOption } from "database";

export const mapAnswerToFriendlyLabel = (answer: AnswerOption | null) => {
	switch (answer) {
		case "GOOD": {
			return "0. Good mobility";
		}

		case "IMPERFECT": {
			return "1. Imperfect mobility ";
		}

		case "IMPAIRED": {
			return "2. Impaired mobility";
		}

		case "SEVERELY_IMPAIRED": {
			return "3. Severely impaired mobility";
		}

		default: {
			return "";
		}
	}
};
