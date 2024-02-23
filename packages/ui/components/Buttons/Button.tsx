/* eslint-disable no-unused-vars */
import { Button as GSButton, ButtonText as GSButtonText } from "@gluestack-ui/themed";
import { Clipboard } from "../Icons";

export enum ButtonVariant {
	LARGE = "large",
	PRIMARY = "primary",
	SECONDARY = "secondary"
}

interface IButton {
	variant: ButtonVariant;
	buttonText: string;
	isDisabled?: boolean;
	onPress?: () => void;
}

export const Button = ({ buttonText, isDisabled = false, variant, onPress }: IButton) => {
	return (
		// @ts-ignore
		<GSButton isDisabled={isDisabled} variant={variant} onPress={onPress}>
			{variant === ButtonVariant.LARGE && <Clipboard />}
			<GSButtonText>{buttonText}</GSButtonText>
		</GSButton>
	);
};
