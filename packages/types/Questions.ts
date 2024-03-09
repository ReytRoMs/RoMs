import { AnswerOption } from "database";

export interface QuestionResult {
	youtubeId: string;
	usersAnswer: AnswerOption | null;
	correctAnswer: AnswerOption | undefined;
}

export interface IResultsTableData {
	results: QuestionResult[];
	totalNumberOfQuestions: number;
	totalNumberOfCorrectAnswers: number;
	percentageCorrect: number;
}
