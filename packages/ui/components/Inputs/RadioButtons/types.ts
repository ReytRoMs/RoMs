export interface IRadioButton {
	label: string;
	value: string;
	onChange: (value: string) => void;
	isChecked: boolean;
	isErrored: boolean;
	isDisabled?: boolean;
}

export interface IRadioButtons {
	options: Pick<IRadioButton, "label" | "value" | "isDisabled">[];
	name: string;
	isDisabled?: boolean;
}
