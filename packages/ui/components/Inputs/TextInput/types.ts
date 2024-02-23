/* eslint-disable no-unused-vars */
import { FieldHelperProps, FieldInputProps, FieldMetaProps } from "formik";
import { TextInputProps } from "react-native";

type FieldErrorMessage = string | string[];

type FieldProps = FieldInputProps<string>;
interface MetaProps extends Omit<FieldMetaProps<string>, "error"> {
	error: FieldErrorMessage;
}

type HelperProps = FieldHelperProps<string>;

export type UseFieldPropsWithEnhancedErrorMessaging = [FieldProps, MetaProps, HelperProps];

export interface IBaseInputProps extends TextInputProps {
	type?: "text" | "password";
	label?: string | null;
	placeholder?: string;
	renderIcon?: null | (({ isFocussed, isError }: { isFocussed: boolean; isError: boolean }) => React.ReactNode);
	renderErrorMessage: ({
		errorMessage,
		isFocussed
	}: {
		errorMessage: FieldErrorMessage;
		isFocussed: boolean;
	}) => React.ReactNode;
	name: string;
	disabled?: boolean;
	userHints?: string[];
	errorMessage?: FieldErrorMessage;
}

export type ITextInputProps = Omit<IBaseInputProps, "text" | "renderIcon" | "renderErrorMessage" | "userHints">;
