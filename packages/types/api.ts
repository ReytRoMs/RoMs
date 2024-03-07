export interface IErrorResponse {
	errorMessage: string;
	errorReasons?: string[];
	statusCode: number;
}

export interface IClientError extends Error {
	info?: IErrorResponse;
}
