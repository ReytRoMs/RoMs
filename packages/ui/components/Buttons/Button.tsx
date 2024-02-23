import { Button as GSButton, ButtonText as GSButtonText } from "@gluestack-ui/themed";
import { Clipboard } from "../Icons";

type ButtonVariant = "large" | "primary" | "secondary";

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
			{variant === "large" && <Clipboard />}
			<GSButtonText>{buttonText}</GSButtonText>
		</GSButton>
	);
};
