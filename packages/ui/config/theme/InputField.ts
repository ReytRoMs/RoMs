import { createStyle } from "@gluestack-style/react";

export const InputField = createStyle({
	color: "$textBody",
	fontWeight: "$normal",
	fontFamily: "$body",
	height: "auto",
	variants: {
		size: {
			sm: {
				fontSize: 16
			},
			md: {
				fontSize: 16
			},
			lg: {
				fontSize: 40
			}
		}
	}
});
