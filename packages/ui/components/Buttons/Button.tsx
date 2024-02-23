import { Button as GSButton, ButtonText as GSButtonText } from "@gluestack-ui/themed";
import { ComponentProps } from "react";
import { Clipboard } from "../Icons";

type ButtonVariant = "solid" | "outline" | "link";

interface IButton {
	variant: ButtonVariant;
	buttonText: string;
	// iconName?: IconsName;
	isDisabled?: boolean;
	onPress?: () => void;
	borderColour?: ComponentProps<typeof GSButton>["borderColor"];
}

export const Button = ({ buttonText, isDisabled = false, variant, onPress }: IButton) => {
	return (
		// @ts-ignore
		<GSButton isDisabled={isDisabled} variant={variant} onPress={onPress}>
			<Clipboard />
			<GSButtonText>{buttonText}</GSButtonText>
		</GSButton>
	);
};
