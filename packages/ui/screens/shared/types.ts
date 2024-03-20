export interface IErrorResponse {
	message: string;
	reasons: string[];
}

export interface IClientError extends Error {
	info: IErrorResponse;
}

export interface AnswerRoutePayload {
	answer?: string;
	questionId: string;
}
