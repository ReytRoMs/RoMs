import { MustContain } from "./MustContain";

export const UserHints = ({
	userHints,
	errorMessage,
	showSuccessOrErrorState
}: {
	userHints: string[];
	errorMessage: string | string[];
	showSuccessOrErrorState: boolean;
}) => {
	if (userHints?.length === 0) return null;

	// If there are userHints attempt to render the userHints and either show either Error, Success or White (This act's as a visual check list which updates when the form validation state is, this depends on the config implemented)
	return (
		userHints?.map((hint, index) => {
			let colour = "";

			// If the user has
			if (!showSuccessOrErrorState) {
				colour = "$textBody";
			}

			// Handles cases where the error is a simple string value e.g. "This is a required field"
			if (showSuccessOrErrorState && typeof errorMessage === "string") {
				colour = hint.includes(errorMessage) ? "$validError" : "$validSuccess";
			}

			// Handles cases where there are multiple errors at once e .g. "This is a required field" and "This must be more than 8 characters"
			if (showSuccessOrErrorState && Array.isArray(errorMessage) && typeof errorMessage !== "undefined") {
				colour =
					errorMessage?.find((singleErrorMessage) => singleErrorMessage.includes(hint)) !== undefined
						? "$validError"
						: "$validSuccess";
			}

			return <MustContain key={`${hint}-${index}`} colour={colour} message={hint} />;
		}) ?? null
	);
};
