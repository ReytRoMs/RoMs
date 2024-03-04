import { createStyle } from "@gluestack-style/react";

export const Textarea = createStyle({
	w: "100%",
	h: 100,
	_input: {
		p: "$3",
		_web: {
			outlineWidth: 0,
			outline: "none"
		}
	},
	":hover": {
		borderColor: "$borderLight400"
	},

	":focus": {
		borderColor: "$primary700",
		":hover": {
			borderColor: "$primary700"
		}
	},

	":disabled": {
		opacity: 0.4,
		":hover": {
			borderColor: "$background"
		}
	},
	fontFamily: "$body"
});
