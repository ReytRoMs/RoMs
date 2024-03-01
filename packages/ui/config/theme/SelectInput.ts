import { createStyle } from "@gluestack-style/react";

export const SelectInput = createStyle({
	flex: 1,
	color: "$textBody",
	props: {
		placeholderTextColor: "$grey"
	},
	fontFamily: "$body"
});
