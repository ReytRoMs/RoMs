"use client";

import { useField, useFormikContext } from "formik";
import { IRadioButtons } from "./types";
import { RadioButton } from "./RadioButton";
import { View } from "@gluestack-ui/themed";
import { MustContain, UseFieldPropsWithEnhancedErrorMessaging, getErrorMessages } from "../shared";
import { useMemo } from "react";

export const RadioButtons = ({ options = [], name, isDisabled = false, errorMessage = "" }: IRadioButtons) => {
	// Reads the data from the closest Formik provider, this hook manages and reads any data from that
	const [field, meta, helpers] = useField<string>({
		name
	}) as UseFieldPropsWithEnhancedErrorMessaging<string>;

	// Access properties that were passed to the form itself used for performing additional checks below
	const { validateOnBlur } = useFormikContext();

	// Combine all field level errors and any external api errors
	const errorMessages = useMemo(() => {
		// We don't want to show the errors until the field has been touched (This get's set true when you focus or submit the form)
		if (meta.touched === false) return [];

		return getErrorMessages({ fieldError: meta.error, externalErrorMessage: errorMessage });
	}, [meta?.error, errorMessage, meta?.touched, field.value]);

	return (
		<View>
			{options?.map((option, optionIndex) => {
				return (
					<RadioButton
						key={optionIndex}
						label={option.label}
						onChange={(value) => {
							helpers.setValue(value, validateOnBlur);
						}}
						value={option.value}
						isChecked={option.value === field.value}
						isErrored={meta.touched === true && (meta.error?.length ?? 0) > 0}
						isDisabled={isDisabled ?? option.isDisabled}
					/>
				);
			})}

			{errorMessages?.length > 0 && (
				<View marginBottom={20}>{errorMessages?.map((error) => <MustContain message={error} />) ?? null}</View>
			)}
		</View>
	);
};
