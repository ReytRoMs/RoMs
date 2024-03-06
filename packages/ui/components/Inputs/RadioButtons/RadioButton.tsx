"use client";

import { Button } from "../../Buttons/Button";
import { ButtonMode, ButtonVariant } from "@repo/types";
import { IRadioButton } from "./types";

export const RadioButton = ({ label, value, onChange, isChecked, isErrored, isDisabled, ...props }: IRadioButton) => {
	let mode = ButtonMode.DEFAULT;

	if (isChecked === true) {
		mode = ButtonMode.CHECKED;
	} else if (isErrored === true) {
		mode = ButtonMode.ERROR;
	} else {
		mode = ButtonMode.DEFAULT;
	}

	return (
		<Button
			buttonText={label}
			variant={ButtonVariant.RADIO}
			onPress={() => {
				onChange(value);
			}}
			modes={mode}
			isDisabled={isDisabled}
			{...props}
		/>
	);
};
