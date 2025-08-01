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
	View
} from "@gluestack-ui/themed";
import { useField, useFormikContext } from "formik";
import { MustContain } from "../shared/MustContain";
import { UseFieldPropsWithEnhancedErrorMessaging, getErrorMessages } from "../shared";

interface ITextarea {
	label?: string;
	placeholder?: string;
	name: string;
	isDisabled?: boolean;
	errorMessage?: string;
}

export const Textarea = React.memo(
	({ label, placeholder = "", name, isDisabled = false, errorMessage = "", ...props }: ITextarea) => {
		const [isFocussed, setIsFocussed] = React.useState(false);

		// Reads the data from the closest Formik provider, this hook manages and reads any data from that
		const [field, meta, helpers] = useField<string>({
			name
		}) as UseFieldPropsWithEnhancedErrorMessaging<string>;

		// Access properties that were passed to the form itself used for performing additional checks below
		const { validateOnBlur } = useFormikContext();

		// Combine all field level errors and any external api errors
		const errorMessages = React.useMemo(() => {
			// We don't want to show the errors until the field has been touched (This get's set true when you focus or submit the form)
			if (meta.touched === false) return [];

			return getErrorMessages({ fieldError: meta.error, externalErrorMessage: errorMessage });
		}, [meta?.error, errorMessage, meta?.touched, field.value]);

		return (
			<View backgroundColor='transparent'>
				<FormControl
					backgroundColor={isFocussed === true ? "$white" : "transparent"}
					padding={24}
					borderRadius={"$sm"}
					borderWidth={1}
					borderStyle='solid'
					borderColor={errorMessages?.length > 0 ? "$validError" : "$white"}
					opacity={isDisabled === true ? 0.2 : 1}
					isDisabled={isDisabled}
					isInvalid={(errorMessages?.length ?? 0) > 0}
					marginBottom={10}
					gap={"$2"}
					justifyContent='center'
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

				{errorMessages?.length > 0 && (
					<View marginBottom={"$5"} alignItems='center'>
						{errorMessages?.map((error) => <MustContain message={error} key={error} />) ?? null}
					</View>
				)}
			</View>
		);
	}
);
