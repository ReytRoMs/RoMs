/* eslint-disable no-redeclare */
import { View, Text } from "@gluestack-ui/themed";
// import { Warning } from "../Icons";

export const MustContain = ({ message }: { message: string }) => (
	<View flexDirection='column' alignItems='flex-start' backgroundColor='transparent'>
		<View flexDirection='row' backgroundColor='transparent' alignItems='center'>
			<Text color='$validError' variant='body'>
				{message}
			</Text>
		</View>
	</View>
);
