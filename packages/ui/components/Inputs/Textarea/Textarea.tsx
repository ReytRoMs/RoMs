"use client";

/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import * as React from "react";
import {
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	Textarea as GSTextarea,
	TextareaInput as GSTextareaInput,
	Text,
	View
} from "@gluestack-ui/themed";
import { useField, useFormikContext } from "formik";

interface ITextarea {
	label?: string;
	placeholder?: string;
	name: string;
	disabled?: boolean;
	errorMessage?: string;
}

export const Textarea = React.memo(
	({ label, placeholder = "", name, disabled = false, errorMessage = "", ...props }: ITextarea) => {
		const [isFocussed, setIsFocussed] = React.useState(false);

		// Reads the data from the closest Formik provider, this hook manages and reads any data from that
		const [field, meta, helpers] = useField<string>({
			name
		});

		// Access properties that were passed to the form itself used for performing additional checks below
		const { validateOnBlur } = useFormikContext();

		// Combine all field level errors and any external api errors
		const baseInputErrors = React.useMemo(() => {
			let errors: string[] = [];

			// We don't want to show the errors until the field has been touched (This get's set true when you focus or submit the form)
			if (meta.touched === false) return [];

			// Initial setup of the errors, reads just the field validation
			if (Array.isArray(meta?.error)) {
				errors = meta?.error;
			} else if (typeof meta?.error === "string") {
				errors = [meta?.error];
			}

			// Add any external api state to the errors list, combines both field and external errors
			if (errorMessage?.length > 0) {
				if (typeof errorMessage === "string") {
					errors.push(errorMessage);
				}

				if (Array.isArray(errorMessage)) {
					errors.concat([...errorMessage]);
				}
			}

			return errors;
		}, [meta?.error, errorMessage, meta?.touched, field.value]);

		return (
			<View backgroundColor='transparent'>
				<FormControl
					backgroundColor={isFocussed === true ? "$white" : "transparent"}
					padding={24}
					borderRadius={4}
					borderWidth={1}
					borderStyle='solid'
					borderColor={baseInputErrors?.length > 0 ? "$validError" : "$white"}
					opacity={disabled === true ? 0.2 : 1}
					isDisabled={disabled}
					isInvalid={(baseInputErrors?.length ?? 0) > 0}
					marginBottom={10}
					gap={8}
				>
					<GSTextarea>
						{label && (
							<FormControlLabel>
								<FormControlLabelText>{label}</FormControlLabelText>
							</FormControlLabel>
						)}

						<GSTextareaInput
							{...props}
							color={isFocussed === true ? "black" : "$white"}
							placeholderTextColor={"$secondary"}
							placeholder={placeholder}
							onChangeText={(text) => {
								if (!validateOnBlur) {
									helpers.setTouched(true);
								}

								helpers.setValue(text);
							}}
							onFocus={() => {
								setIsFocussed(true);
							}}
							onBlur={() => {
								helpers.setTouched(true);
								setIsFocussed(false);
							}}
						/>
					</GSTextarea>
				</FormControl>

				{meta.touched === true &&
					baseInputErrors?.length > 0 &&
					baseInputErrors?.map((errorMessage) => (
						<Text color='$validError' fontWeight='500' variant='body' marginBottom={20} key={errorMessage}>
							{meta.error}
						</Text>
					))}
			</View>
		);
	}
);
