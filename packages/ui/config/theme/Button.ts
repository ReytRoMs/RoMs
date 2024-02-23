import { createStyle } from "@gluestack-style/react";

export const Button = createStyle({
	borderRadius: "$sm",
	backgroundColor: "$primary",
	flexDirection: "row",
	justifyContent: "center",
	alignItems: "center",
	bg: "$primary",
	variants: {
		variant: {
			large: {}
		}
	}
});
