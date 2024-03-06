"use client";

import { useField, useFormikContext } from "formik";
import { IRadioButtons } from "./types";
import { RadioButton } from "./RadioButton";
import { Box, Text, View } from "@gluestack-ui/themed";
import { MustContain, UseFieldPropsWithEnhancedErrorMessaging, getErrorMessages } from "../shared";
import { useMemo } from "react";

export const RadioButtons = ({
	options = [],
	name,
	isDisabled = false,
	errorMessage = "",
	direction = "column",
	label = undefined,
	...props
}: IRadioButtons) => {
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
			<View gap={16}>
				{label && (
					<Box flexDirection='row' alignItems='center' justifyContent='center'>
						<Text variant='header' fontWeight='$bold'>
							{label}
						</Text>
					</Box>
				)}

				<View flexDirection={direction} justifyContent={direction === "row" ? "center" : "flex-start"} gap={"$4"}>
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
								{...props}
							/>
						);
					})}
				</View>
			</View>

			{errorMessages?.length > 0 && (
				<View marginBottom={"$5"} alignItems='center'>
					{errorMessages?.map((error) => <MustContain message={error} />) ?? null}
				</View>
			)}
		</View>
	);
};
