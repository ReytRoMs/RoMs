import { FieldHelperProps, FieldInputProps, FieldMetaProps } from "formik";

// We can expect either multiple or single messages, it's no limited to a single string value. This is so you can see multiple messages at once if applicable
export type FieldErrorMessage = string | string[];

type FieldProps<InputType> = FieldInputProps<InputType>;

type HelperProps<InputType> = FieldHelperProps<InputType>;

interface MetaProps<InputType> extends Omit<FieldMetaProps<InputType>, "error"> {
	error: FieldErrorMessage;
}

// Combines the "field", "meta" and "helpers" (Yes the order matters as this is the order returned by the useField hook)
export type UseFieldPropsWithEnhancedErrorMessaging<InputType> = [
	FieldProps<InputType>,
	MetaProps<InputType>,
	HelperProps<InputType>
];
