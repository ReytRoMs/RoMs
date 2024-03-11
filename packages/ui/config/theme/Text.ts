import { createStyle } from "@gluestack-style/react";

// eslint-disable-next-line no-redeclare
export const Text = createStyle({
	color: "$textBody",
	fontFamily: "$heading",
	variants: {
		variant: {
			extraLargeHeader: {
				fontFamily: "$heading",
				color: "$textHeader",
				fontSize: 72,
				lineHeight: 48
			},
			largeHeader: {
				fontFamily: "$heading",
				color: "$textHeader",
				fontSize: 48,
				lineHeight: 48
			},
			header2: {
				fontFamily: "$body",
				color: "$textHeader",
				fontSize: 32,
				lineHeight: 39
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
