"use client";

import { useField } from "formik";
import { IRadioButtons } from "./types";
import { RadioButton } from "./RadioButton";
import { Text, View } from "@gluestack-ui/themed";

export const RadioButtons = ({ options, name, isDisabled }: IRadioButtons) => {
	// Reads the data from the closest Formik provider, this hook manages and reads any data from that
	const [field, meta, helpers] = useField<string>({
		name
	});

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

			{meta.touched === true && (meta.error?.length ?? 0) > 0 && (
				<Text color='$validError' fontWeight='500' variant='body' marginBottom={20}>
					{meta.error}
				</Text>
			)}
		</View>
	);
};
