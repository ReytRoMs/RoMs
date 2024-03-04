import { createStyle } from "@gluestack-style/react";

export const SelectTrigger = createStyle({
	flexDirection: "row",
	alignItems: "center",
	backgroundColor: "$dark",

	paddingTop: 12,
	paddingRight: 16,
	paddingBottom: 12,
	paddingLeft: 16,

	overflow: "hidden",
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: "$textBody",
	rounded: 8,
	// marginBottom: 10,
	fontFamily: "$body",

	":hover": {
		borderColor: "$borderLight400"
	},

	":focus": {
		borderColor: "$primary700"
	},

	":disabled": {
		opacity: 0.4,
		":hover": {
			borderColor: "$background"
		}
	},

	_icon: {
		h: 24,
		w: 24
	},

	variants: {
		size: {
			lg: {
				paddingTop: 24,
				paddingRight: 24,
				paddingBottom: 24,
				paddingLeft: 24
			}
		}
	}
});
