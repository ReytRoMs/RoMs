"use client";

import { useField, useFormikContext } from "formik";
import { IRadioButtons } from "./types";
import { RadioButton } from "./RadioButton";
import { Text, View } from "@gluestack-ui/themed";

export const RadioButtons = ({ options, name, isDisabled }: IRadioButtons) => {
	// Reads the data from the closest Formik provider, this hook manages and reads any data from that
	const [field, meta, helpers] = useField<string>({
		name
	});

	// Access properties that were passed to the form itself used for performing additional checks below
	const { validateOnBlur } = useFormikContext();

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

			{meta.touched === true && (meta.error?.length ?? 0) > 0 && (
				<Text color='$validError' fontWeight='500' variant='body' marginBottom={20}>
					{meta.error}
				</Text>
			)}
		</View>
	);
};
