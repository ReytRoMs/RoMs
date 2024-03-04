"use client";

import { IRadioButton } from "./types";
import { Button } from "../Button";
import { ButtonMode, ButtonVariant } from "../types";

export const RadioButton = ({ label, value, onChange, isChecked, isErrored, isDisabled }: IRadioButton) => {
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
		/>
	);
};
