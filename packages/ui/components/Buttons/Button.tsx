/* eslint-disable no-unused-vars */
import { Button as GSButton, ButtonText as GSButtonText, Text } from "@gluestack-ui/themed";
import { Clipboard } from "../Icons";
import { PressableProps } from "react-native";
import { ComponentProps } from "react";
import { ButtonVariant } from "@repo/types";

interface IButton extends PressableProps, ComponentProps<typeof GSButton> {
	variant: ButtonVariant;
	buttonText: string;
	isDisabled?: boolean;
}

export const Button = ({ buttonText, isDisabled = false, variant, onPress, ...props }: IButton) => {
	return (
		<GSButton isDisabled={isDisabled} variant={variant} onPress={onPress} {...props}>
			{variant === ButtonVariant.LARGE && <Clipboard />}
			<GSButtonText>
				<Text variant='header' fontWeight='$bold'>
					{buttonText}
				</Text>
			</GSButtonText>
		</GSButton>
	);
};
