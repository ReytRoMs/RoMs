import { IClientError, IErrorResponse } from "../screens/shared/types";

export const get = async <Response>({ url }: { url: string }) => {
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

	return (await response.json()) as Response;
};

export const post = async <Payload extends object, Response>({ url, data }: { url: string; data: Payload }) => {
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify(data)
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

	if (response.status === 204) {
		return null;
	}

	const parsedData = (await response.json()) as Response;
	return parsedData;
};
