import { createStyle } from "@gluestack-style/react";

export const SelectActionsheetItem = createStyle({
	p: "$3",
	flexDirection: "row",
	alignItems: "center",
	rounded: "$sm",
	w: "$full",

	":disabled": {
		opacity: 0.4,
		_web: {
			pointerEvents: "all !important",
			cursor: "not-allowed"
		}
	},

	":active": {
		bg: "$textBody"
	}
});
