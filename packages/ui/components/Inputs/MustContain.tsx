import { View, Text } from "@gluestack-ui/themed";
// import { Warning } from "../Icons";

export const MustContain = ({ colour, message }: { colour: string; message: string }) => (
	<View flexDirection='column' alignItems='flex-start' backgroundColor='transparent'>
		<View flexDirection='row' backgroundColor='transparent' alignItems='center'>
			<View marginRight={5} backgroundColor='transparent'>
				{/* <Warning colour={colour} /> */}
			</View>
			<Text color={colour} fontSize={12} fontWeight='400' lineHeight={20} letterSpacing={0} textAlign='left'>
				{message}
			</Text>
		</View>
	</View>
);
