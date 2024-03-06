import { createStyle } from "@gluestack-style/react";

// eslint-disable-next-line no-redeclare
export const Text = createStyle({
	color: "$textBody",
	fontFamily: "$heading",
	variants: {
		variant: {
			largeHeader: {
				fontFamily: "$heading",
				color: "$textHeader",
				fontSize: 48,
				lineHeight: 48
			},
			header: {
				fontFamily: "$heading",
				color: "$textHeader",
				fontSize: 16,
				lineHeight: 24
			},
			body: {
				fontFamily: "$body",
				color: "$textBody",
				fontSize: 16,
				lineHeight: 24
			},
			small: {
				fontFamily: "$body",
				color: "$textBody",
				fontSize: 12,
				lineHeight: 20
			}
		}
	}
});
