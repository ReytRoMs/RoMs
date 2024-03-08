import { IClientError, IErrorResponse } from "../shared/types";
import { AnswerRoutePayload } from "./types";

export const postVideoAnswerAction = async (url: string, { arg }: { arg: AnswerRoutePayload }) => {
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			questionId: arg.questionId,
			usersAnswer: arg.answer
		})
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

	return null;
};
