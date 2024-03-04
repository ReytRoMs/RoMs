import { FieldErrorMessage } from "./types";

export const getErrorMessages = ({
	externalErrorMessage,
	fieldError
}: {
	externalErrorMessage: FieldErrorMessage;
	fieldError: FieldErrorMessage;
}) => {
	let errors: string[] = [];

	// Initial setup of the errors, reads just the field validation
	if (Array.isArray(fieldError)) {
		errors = fieldError;
	} else if (typeof fieldError === "string") {
		errors = [fieldError];
	}

	// Add any external api state to the errors list, combines both field and external errors
	if (externalErrorMessage?.length > 0) {
		if (typeof externalErrorMessage === "string") {
			errors.push(externalErrorMessage);
		}

		if (Array.isArray(externalErrorMessage)) {
			errors.concat([...externalErrorMessage]);
		}
	}

	return errors;
};
