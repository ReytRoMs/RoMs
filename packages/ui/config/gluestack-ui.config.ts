import { AnimationResolver } from "@gluestack-style/animation-resolver";
import { MotionAnimationDriver } from "@gluestack-style/legend-motion-animation-driver";
import { createConfig, createComponents } from "@gluestack-style/react";
import * as componentsTheme from "./theme";

export const gluestackUIConfig = createConfig({
	aliases: {
		bg: "backgroundColor",
		bgColor: "backgroundColor",
		h: "height",
		w: "width",
		p: "padding",
		px: "paddingHorizontal",
		py: "paddingVertical",
		pt: "paddingTop",
		pb: "paddingBottom",
		pr: "paddingRight",
		pl: "paddingLeft",
		m: "margin",
		mx: "marginHorizontal",
		my: "marginVertical",
		mt: "marginTop",
		mb: "marginBottom",
		mr: "marginRight",
		ml: "marginLeft",
		rounded: "borderRadius"
	} as const,
	tokens: {
		colors: {
			// *** SHARED NAMES ***
			// background
			background: "#162B32",

			// general
			primary: "#E91212",
			secondary: "#999999",
			amber: "#E99312",

			// text
			textHeader: "#FFFFFF",
			textBody: "#CED1D5",
			textWhite: "#FFFFFF",

			// validation
			validError: "#E91212",
			validSuccess: "#36CC60",

			// *** PROJECT-SPECIFIC NAMES ***
			white: "#FFFFFF",
			dark: "#111C20",
			green: "#36CC60"
		},
		space: {
			px: "1px",
			"0": 0,
			"0.5": 2,
			"1": 4,
			"1.5": 6,
			"2": 8,
			"2.5": 10,
			"3": 12,
			"3.5": 14,
			"4": 16,
			"4.5": 18,
			"5": 20,
			"6": 24,
			"7": 28,
			"8": 32,
			"9": 36,
			"10": 40,
			"11": 44,
			"12": 48,
			"16": 64,
			"20": 0,
			"24": 96,
			"32": 128,
			"40": 160,
			"48": 192,
			"56": 224,
			"64": 256,
			"72": 288,
			"80": 320,
			"96": 384,
			"1/2": "50%",
			"1/3": "33.333%",
			"2/3": "66.666%",
			"1/4": "25%",
			"2/4": "50%",
			"3/4": "75%",
			"1/5": "20%",
			"2/5": "40%",
			"3/5": "60%",
			"4/5": "80%",
			"1/6": "16.666%",
			"2/6": "33.333%",
			"3/6": "50%",
			"4/6": "66.666%",
			"5/6": "83.333%",
			full: "100%"
		},
		borderWidths: {
			"0": 0,
			"1": 1,
			"2": 2,
			"4": 4,
			"8": 8
		},
		radii: {
			none: 0,
			xs: 2,
			sm: 4,
			md: 6,
			lg: 8,
			xl: 12,
			"2xl": 16,
			"3xl": 24,
			full: 9999
		},
		breakpoints: {
			base: 0,
			sm: 480,
			md: 768,
			lg: 992,
			xl: 1280
		},
		mediaQueries: {
			base: "@media screen and (min-width: 0)",
			xs: "@media screen and (min-width: 400px)",
			sm: "@media screen and (min-width: 480px)",
			md: "@media screen and (min-width: 992px)",
			lg: "@media screen and (min-width: 992px)",
			xl: "@media screen and (min-width: 1280px)"
		},
		letterSpacings: {
			xs: -0.4,
			sm: -0.2,
			md: 0,
			lg: 0.2,
			xl: 0.4,
			"2xl": 1.6
		},
		lineHeights: {
			"2xs": 16,
			xs: 18,
			sm: 20,
			md: 22,
			lg: 24,
			xl: 28,
			"2xl": 32,
			"3xl": 40,
			"4xl": 48,
			"5xl": 56,
			"6xl": 72,
			"7xl": 90
		},
		fontWeights: {
			hairline: "100",
			thin: "200",
			light: "300",
			normal: "400",
			medium: "500",
			semibold: "600",
			bold: "700",
			extrabold: "800",
			black: "900",
			extraBlack: "950"
		},
		fonts: {
			heading: "montserrat",
			body: "montserrat"
		},
		fontSizes: {
			"2xs": 10,
			xs: 12,
			sm: 14,
			md: 16,
			lg: 18,
			xl: 20,
			"2xl": 24,
			"3xl": 30,
			"4xl": 36,
			"5xl": 48,
			"6xl": 60,
			"7xl": 72,
			"8xl": 96,
			"9xl": 128
		},
		opacity: {
			0: 0,
			5: 0.05,
			10: 0.1,
			20: 0.2,
			25: 0.25,
			30: 0.3,
			40: 0.4,
			50: 0.5,
			60: 0.6,
			70: 0.7,
			75: 0.75,
			80: 0.8,
			90: 0.9,
			95: 0.95,
			100: 1
		}
	} as const,
	globalStyle: {
		variants: {
			hardShadow: {
				"1": {
					shadowColor: "$background",
					shadowOffset: {
						width: -2,
						height: 2
					},
					shadowRadius: 8,
					shadowOpacity: 0.5,
					elevation: 10
				},
				"2": {
					shadowColor: "$background",
					shadowOffset: {
						width: 0,
						height: 3
					},
					shadowRadius: 8,
					shadowOpacity: 0.5,
					elevation: 10
				},
				"3": {
					shadowColor: "$background",
					shadowOffset: {
						width: 2,
						height: 2
					},
					shadowRadius: 8,
					shadowOpacity: 0.5,
					elevation: 10
				},
				"4": {
					shadowColor: "$background",
					shadowOffset: {
						width: 0,
						height: -3
					},
					shadowRadius: 8,
					shadowOpacity: 0.5,
					elevation: 10
				},
				// this 5th version is only for toast shadow
				// temporary
				"5": {
					shadowColor: "$background",
					shadowOffset: {
						width: 0,
						height: 3
					},
					shadowRadius: 8,
					shadowOpacity: 0.2,
					elevation: 10
				}
			},
			softShadow: {
				"1": {
					shadowColor: "$background",
					shadowOffset: {
						width: 0,
						height: 0
					},
					shadowRadius: 10,
					shadowOpacity: 0.1,
					_android: {
						shadowColor: "$background",
						elevation: 5,
						shadowOpacity: 0.05
					}
				},
				"2": {
					shadowColor: "$background",
					shadowOffset: {
						width: 0,
						height: 0
					},
					shadowRadius: 20,
					elevation: 3,
					shadowOpacity: 0.1,
					_android: {
						shadowColor: "$background",
						elevation: 10,
						shadowOpacity: 0.1
					}
				},
				"3": {
					shadowColor: "$background",
					shadowOffset: {
						width: 0,
						height: 0
					},
					shadowRadius: 30,
					shadowOpacity: 0.1,
					elevation: 4,
					_android: {
						shadowColor: "$background",
						elevation: 15,
						shadowOpacity: 0.15
					}
				},
				"4": {
					shadowColor: "$background",
					shadowOffset: {
						width: 0,
						height: 0
					},
					shadowRadius: 40,
					shadowOpacity: 0.1,
					elevation: 10,
					_android: {
						shadowColor: "$background",
						elevation: 20,
						shadowOpacity: 0.2
					}
				}
			}
		}
	},
	plugins: [new AnimationResolver(MotionAnimationDriver)]
});

type Config = typeof gluestackUIConfig; // Assuming `config` is defined elsewhere

type Components = typeof componentsConfig;

export const componentsConfig = createComponents(componentsTheme);

export type { UIConfig, UIComponents } from "@gluestack-ui/themed";

export interface IConfig {}
export interface IComponents {}

declare module "@gluestack-ui/themed" {
	// eslint-disable-next-line no-unused-vars
	interface UIConfig extends Omit<Config, keyof IConfig>, IConfig {}
	// eslint-disable-next-line no-unused-vars
	interface UIComponents extends Omit<Components, keyof IComponents>, IComponents {}
}

export const config = {
	...gluestackUIConfig,
	components: componentsConfig
};
