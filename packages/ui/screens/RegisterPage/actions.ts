// Shared types, these are types which will be used across all pages
import { IError, IErrorResponse } from "../shared/types";

// Local types specifically for this file
import { SignUpFormData, UserSessionResponse } from "./types";

export const createUserSessionAction = async (url: string, { arg }: { arg: SignUpFormData }) => {
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			isCurrentRomsMember: arg.areYouACurrentRoMsMember === "yes",
			usersPrimaryRole: arg.role
		})
	});

	if (!response.ok) {
		// If the errors content-type is json then use that e.g. {message: 'Something went wrong", errorReasons: ['First Name" required]}
		if (response.headers.get("content-type") === "application/json") {
			const errorResponse = (await response.json()) as IErrorResponse;

			const error: IError = {
				...new Error("Unexpected server error whilst creating a user"),
				info: errorResponse
			};

			throw error;
		}

		throw new Error(`Request failed with a ${response.status} status code`);
	}

	const parsedData = (await response.json()) as UserSessionResponse;
	return parsedData;
};
