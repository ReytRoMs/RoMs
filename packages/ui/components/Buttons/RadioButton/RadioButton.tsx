"use client";

import { IRadioButton } from "./types";
import { Button } from "../Button";
import { ButtonState, ButtonVariant } from "../types";

export const RadioButton = ({ label, value, onChange, isChecked, isErrored, isDisabled }: IRadioButton) => {
	let state = ButtonState.DEFAULT;

	if (isChecked === true) {
		state = ButtonState.CHECKED;
	} else if (isErrored === true) {
		state = ButtonState.ERROR;
	} else {
		state = ButtonState.DEFAULT;
	}

	return (
		<Button
			buttonText={label}
			variant={ButtonVariant.RADIO}
			onPress={() => {
				onChange(value);
			}}
			modes={state}
			isDisabled={isDisabled}
		/>
	);
};
