import { Button, ButtonText } from "@gluestack-ui/themed";

interface IPrimaryIconButton {
	icon: any;
	text: string;
	handlePress: () => void;
}

export const PrimaryIconButton = ({ icon, text, handlePress }: IPrimaryIconButton) => {
	return (
		<Button onPress={handlePress}>
			<ButtonText>{icon}</ButtonText>
			<ButtonText>{text}</ButtonText>
			{/* TODO: */}
			{/* <ButtonIcon>{icon}</ButtonIcon> */}
		</Button>
	);
};
