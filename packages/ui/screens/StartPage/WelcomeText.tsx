"use client";

import { Box, Text } from "@gluestack-ui/themed";
import { TextLink } from "solito/link";

import { config } from "ui/config/gluestack-ui.config";

export const WelcomeText = () => {
	return (
		<Box
			gap={"$6"}
			sx={{
				"@base": {
					width: "$full"
				},
				"@md": {
					width: 430
				}
			}}
		>
			<Text variant='largeHeader' fontWeight='800'>
				Welcome.
			</Text>

			<Text variant='body'>
				Welcome to the RoMS mobility scoring calibration tool, that has been designed to help you to calibrate your
				mobility scoring.
			</Text>

			<Text variant='body'>
				You will be given the chance to score 50 video clips of cows walking and will receive feedback on your scores
				once you are finished.
			</Text>

			<Text variant='body'>
				If you have questions about RoMS or this website,{" "}
				<TextLink
					textProps={{
						style: {
							color: config.tokens.colors.validError,
							fontFamily: config.tokens.fonts.body,
							fontSize: 16,
							lineHeight: 24
						}
					}}
					href='https://roms.org.uk/contact-us/'
				>
					please click here
				</TextLink>
			</Text>
		</Box>
	);
};
