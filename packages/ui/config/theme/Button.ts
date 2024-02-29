import { createStyle } from "@gluestack-style/react";

export const Button = createStyle({
	borderRadius: 8,
	paddingVertical: 18,
	marginBottom: 16,
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	alignContent: "center",
	gap: 8,
	_text: {
		color: "$white"
	},
	":disabled": {
		opacity: 0.2,
		cursor: "not-allowed"
	},
	":hover": {
		boxShadow: "0 0 16px #FFFFFF33"
	},
	":active": {
		boxShadow: "inset 0 0 8px #00000066"
	},
	variants: {
		variant: {
			primary: {
				backgroundColor: "$primary",
				_text: {
					color: "$white"
				},
				width: "$full",
				"@lg": {
					width: 272
				}
			},
			secondary: {
				backgroundColor: "$secondary",
				_text: {
					color: "$white"
				},
				width: "$full",
				"@lg": {
					width: 272
				}
			},
			large: {
				backgroundColor: "$primary",
				_text: {
					color: "$white"
				},
				width: 192,
				height: 192,
				borderRadius: 1000
			},
			radio: {
				padding: 32,
				gap: 8,
				borderRadius: "$full",
				borderWidth: 1,
				borderColor: "$white",
				borderStyle: "solid",
				":hover": {
					backgroundColor: "$dark"
				},

				":active": {
					backgroundColor: "$green"
				},

				":focus": {
					backgroundColor: "$dark"
				}
			}
		}
	}
});
