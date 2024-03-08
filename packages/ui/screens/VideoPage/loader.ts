import { IClientError, IErrorResponse } from "../shared/types";
import { IQuestion } from "./types";

export const getVideoLoader = async (url: string) => {
	const response = await fetch(url, {
		method: "GET"
	});

	if (!response.ok) {
		// If the errors content-type is json then use that e.g. {message: 'Something went wrong", errorReasons: ['First Name" required]}
		if (response.headers.get("content-type") === "application/json") {
			const errorResponse = (await response.json()) as IErrorResponse;

			const error: IClientError = {
				...new Error("Unexpected server error whilst creating a user"),
				info: errorResponse
			};

			throw error;
		}

		throw new Error(`Request failed with a ${response.status} status code`);
	}

	return (await response.json()) as IQuestion;
};
