export interface QuestionResult {
	youtubeId: string;
	usersAnswer: string | null;
	correctAnswer: string | null;
}

export interface IResultsTableData {
	results: QuestionResult[];
	totalNumberOfQuestions: number;
	totalNumberOfCorrectAnswers: number;
	percentageCorrect: number;
	scores: {
		accuracy: number;
		sensitivity: number;
		specificity: number;
	};
}

export interface IQuestion {
	questionId: string;
	youtubeId: string;
	allQuestionsAreAnswered: boolean;
	order: number;
	total: number;
}
