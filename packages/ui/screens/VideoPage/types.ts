export interface AnswerFormData {
	answer?: string;
}

export interface AnswerRoutePayload {
	answer?: string;
	questionId: string;
}

export interface IQuestion {
	questionId: string;
	youtubeId: string;
	allQuestionsAreAnswered: boolean;
	order: number;
	total: number;
}
