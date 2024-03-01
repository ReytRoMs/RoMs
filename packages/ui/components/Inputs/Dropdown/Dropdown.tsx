"use client";

/* eslint-disable no-redeclare */
import {
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	SelectBackdrop,
	SelectPortal,
	Select,
	SelectInput,
	SelectTrigger,
	Text,
	View
} from "@gluestack-ui/themed";
import { CaretDown } from "../../Icons";
import { BaseInputProps, FieldOption, UseFieldPropsWithEnhancedErrorMessaging } from "../shared/types";
import { useField } from "formik";
import * as React from "react";
import { getErrorMessages, MustContain } from "../shared";
import { DropdownMenu } from "./DropdownMenu";

interface IDropdownProps extends Pick<BaseInputProps, "name" | "errorMessage" | "disabled" | "label" | "placeholder"> {
	options: FieldOption[];
}

export const Dropdown = ({
	name,
	options,
	errorMessage = "",
	disabled = false,
	label = "",
	placeholder = "Select an option"
}: IDropdownProps) => {
	// Reads the data from the closest Formik provider, this hook manages and reads any data from that
	const [field, meta, helpers] = useField<string>({
		name
	}) as UseFieldPropsWithEnhancedErrorMessaging<string>;

	// Combine all field level errors and any external api errors
	const errorMessages = React.useMemo(() => {
		// We don't want to show the errors until the field has been touched (This get's set true when you focus or submit the form)
		if (meta.touched === false) return [];

		return getErrorMessages({ externalErrorMessage: errorMessage, fieldError: meta.error });
	}, [meta?.error, errorMessage, meta?.touched, field.value]);

	return (
		<FormControl
			isInvalid={errorMessages.length > 0}
			isDisabled={disabled}
			backgroundColor='transparent'
			borderWidth={0}
			paddingLeft={0}
			paddingRight={0}
			gap={16}
		>
			<FormControlLabel flexDirection='row' gap={5} alignItems='center' justifyContent='center'>
				<FormControlLabelText>
					<Text variant='header' fontWeight='700'>
						{label}
					</Text>
				</FormControlLabelText>
			</FormControlLabel>
			<Select
				onValueChange={(value) => {
					helpers.setValue(value);
				}}
				selectedValue={field.value}
			>
				<SelectTrigger borderColor={errorMessages?.length > 0 ? "$validError" : "$white"} size='lg'>
					<SelectInput placeholder={placeholder} />
					<CaretDown colour={errorMessages?.length > 0 ? "$validError" : "$white"} />
				</SelectTrigger>

				<SelectPortal>
					<SelectBackdrop />
					<DropdownMenu options={options} value={field.value} />
				</SelectPortal>
			</Select>

			{errorMessages?.length > 0 && (
				<View marginBottom={20}>{errorMessages?.map((error) => <MustContain message={error} />) ?? null}</View>
			)}
		</FormControl>
	);
};
