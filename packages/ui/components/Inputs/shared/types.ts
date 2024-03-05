/* eslint-disable no-unused-vars */
import { ComponentProps } from "react";
import { FieldHelperProps, FieldInputProps, FieldMetaProps } from "formik";
import { InputField } from "@gluestack-ui/themed";

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

export type FieldOption = { id: string; label: string; disabled?: boolean; value: string };

export type BaseInputProps = {
	label?: string | null;
	placeholder?: string;
	name: string;
	disabled?: boolean;
	errorMessage?: FieldErrorMessage;
	onBlur?: null | (() => void);
	onFocus?: null | (() => void);
	onChange?: null | ((value: string) => void);
	fontFamily?: ComponentProps<typeof InputField>["fontFamily"];
};
