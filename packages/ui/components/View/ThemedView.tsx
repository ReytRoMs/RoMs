import { View } from "@gluestack-ui/themed";

interface IThemedView {
	children: JSX.Element | JSX.Element[];
}

export const ThemedView = ({ children }: IThemedView) => {
	return <View>{children}</View>;
};
