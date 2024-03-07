export interface IErrorResponse {
	message: string;
	reasons: string[];
	statusCode: string;
}

export interface IError extends Error {
	info?: IErrorResponse;
}
