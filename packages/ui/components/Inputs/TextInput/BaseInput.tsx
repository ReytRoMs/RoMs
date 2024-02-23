"use client";

/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { FormControl, FormControlLabel, FormControlLabelText, Input, InputField, View } from "@gluestack-ui/themed";
import { useField, useFormikContext } from "formik";
import { IBaseInputProps, UseFieldPropsWithEnhancedErrorMessaging } from "./types";

export const BaseInput = React.memo(
	({
		type = "text",
		label,
		placeholder = "",
		renderIcon = null,
		name,
		disabled = false,
		userHints = [],
		errorMessage = "",
		renderErrorMessage,
		...props
	}: IBaseInputProps) => {
		const [isFocussed, setIsFocussed] = React.useState(false);

		// Reads the data from the closest Formik provider, this hook manages and reads any data from that
		const [field, meta, helpers] = useField<string>({
			name
		}) as UseFieldPropsWithEnhancedErrorMessaging;

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
					backgroundColor='$lighten'
					paddingTop={8}
					paddingRight={16}
					paddingBottom={8}
					paddingLeft={16}
					borderRadius={8}
					borderWidth={1}
					borderStyle='solid'
					borderColor={baseInputErrors?.length > 0 ? "$validError" : isFocussed === true ? "$secondary" : "$lighten"}
					opacity={disabled === true ? 0.2 : 1}
					isDisabled={disabled}
					isInvalid={(baseInputErrors?.length ?? 0) > 0}
					marginBottom={10}
					gap={8}
				>
					<Input>
						{label && (
							<FormControlLabel>
								<FormControlLabelText>{label}</FormControlLabelText>
							</FormControlLabel>
						)}

						<View flexDirection='row' backgroundColor='transparent'>
							<InputField
								{...props}
								type={type}
								placeholder={placeholder}
								onFocus={() => {
									setIsFocussed(true);
								}}
								onBlur={() => {
									helpers.setTouched(true);
									setIsFocussed(false);
								}}
								onChangeText={(value) => {
									if (!validateOnBlur) {
										helpers.setTouched(true);
									}

									// Update the Formik value, if applicable also validate it (Required in certain cases where you want some fields to live update and others not so much).
									helpers.setValue(value);
								}}
								value={field.value}
								flex={1}
							/>

							{renderIcon !== null && renderIcon({ isFocussed, isError: baseInputErrors?.length > 0 })}
						</View>
					</Input>
				</FormControl>

				{renderErrorMessage({ errorMessage: baseInputErrors, isFocussed })}
			</View>
		);
	}
);
