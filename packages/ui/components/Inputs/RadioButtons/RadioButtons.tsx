"use client";

import { useField } from "formik";
import { RadioButton } from "./RadioButton";
import { View } from "@gluestack-ui/themed";
import { MustContain, UseFieldPropsWithEnhancedErrorMessaging, getErrorMessages } from "../shared";
import { useMemo } from "react";

interface IRadioButtons {
	options: Pick<IRadioButton, "label" | "value" | "isDisabled">[];
	name: string;
	isDisabled?: boolean;
	errorMessage?: string;
}

export const RadioButtons = ({ options, name, isDisabled, errorMessage = "" }: IRadioButtons) => {
	// Reads the data from the closest Formik provider, this hook manages and reads any data from that
	const [field, meta, helpers] = useField<string>({
		name
	}) as UseFieldPropsWithEnhancedErrorMessaging<string>;

	// Combine all field level errors and any external api errors
	const errorMessages = useMemo(() => {
		// We don't want to show the errors until the field has been touched (This get's set true when you focus or submit the form)
		if (meta.touched === false) return [];

		return getErrorMessages({ fieldError: meta.error, externalErrorMessage: errorMessage });
	}, [meta?.error, errorMessage, meta?.touched, field.value]);

	return (
		<View>
			<View>
				{options?.map((option) => {
					return (
						<RadioButton
							key={`${option.label}.${option.value}`}
							label={option.label}
							onChange={() => {
								helpers.setValue(option.value);

								helpers.setTouched(true);
							}}
							value={option.value}
							isChecked={option.value === field.value}
							isErrored={(meta?.error?.length ?? 0) > 0}
							isDisabled={isDisabled ?? option.isDisabled}
						/>
					);
				})}
			</View>

			{errorMessages?.map((error) => <MustContain message={error} />) ?? null}
		</View>
	);
};
