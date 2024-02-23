import { XCircle } from "../../Icons";
import { MustContain } from "../MustContain";
import { BaseInput } from "./BaseInput";
import { ITextInputProps } from "./types";

export const TextInput = ({ ...props }: ITextInputProps) => {
	return (
		<BaseInput
			{...props}
			renderIcon={(props) => {
				// When in error mode show the XCircle to indicate an error
				if (props?.isError) {
					return <XCircle colour={"$validError"} />;
				}

				return null;
			}}
			renderErrorMessage={({ errorMessage }) => {
				// No error message then don't render anything.
				if (errorMessage?.length === 0) return null;

				// Handles cases where the error is a simple string value e.g. "This is a required field"
				if (typeof errorMessage === "string") {
					return <MustContain colour={"$validError"} message={errorMessage} />;
				}

				// Handles cases where there are multiple errors at once e .g. "This is a required field" and "This must be more than 8 characters"
				return errorMessage?.map((errorMessage) => (
					<MustContain key={errorMessage} colour='$validError' message={errorMessage} />
				));
			}}
			type='text'
		/>
	);
};
