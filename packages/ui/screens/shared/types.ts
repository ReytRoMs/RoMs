export interface IErrorResponse {
	message: string;
	reasons: string[];
}

export interface IClientError extends Error {
	info: IErrorResponse;
}
