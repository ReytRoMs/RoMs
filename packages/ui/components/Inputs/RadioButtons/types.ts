import { Pressable } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

export interface IRadioButton extends Pick<ComponentProps<typeof Pressable>, "width"> {
	label: string;
	value: string;
	onChange: (value: string) => void;
	isChecked: boolean;
	isErrored: boolean;
	isDisabled?: boolean;
}

export interface IRadioButtons extends Pick<ComponentProps<typeof Pressable>, "width"> {
	options: Pick<IRadioButton, "label" | "value" | "isDisabled">[];
	name: string;
	isDisabled?: boolean;
	errorMessage?: string;
	direction?: "row" | "column";
	label?: string;
	onChange?: null | ((value: string) => void);
}
