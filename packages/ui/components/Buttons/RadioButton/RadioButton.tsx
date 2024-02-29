"use client";

import { IRadioButton } from "./types";
import { Button } from "../Button";
import { ButtonVariant } from "../types";

export const RadioButton = ({ label, value, onChange, isChecked, isErrored, isDisabled }: IRadioButton) => {
	let backgroundColour = undefined;

	let borderColour = "$white";

	if (isChecked === true) {
		backgroundColour = "$green";
	}

	if (isErrored === true) {
		borderColour = "$validError";
	}

	return (
		<Button
			buttonText={label}
			variant={ButtonVariant.RADIO}
			onPress={() => {
				onChange(value);
			}}
			width={"$full"}
			backgroundColor={backgroundColour}
			borderColor={borderColour}
			sx={{
				// Can't be applied via the createStyle util
				":hover": {
					backgroundColor: "$dark"
				}
			}}
			isDisabled={isDisabled}
		/>
	);
};
