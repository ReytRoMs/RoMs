"use client";

import { Box, Text } from "@gluestack-ui/themed";
import { Button, PageLayout } from "ui";

import { SolitoImage } from "solito/image";
import { TextLink } from "solito/link";
import { config } from "ui/config/gluestack-ui.config";
import { ButtonVariant } from "@repo/types";

export default function Home() {
	return (
		<PageLayout>
			<Box justifyContent='center' alignItems='center'>
				<SolitoImage
					alt={`ROM's company logo `}
					src={{
						src: `/logo.png`,
						width: 216,
						height: 60
					}}
					style={{ paddingVertical: 50 }}
					resizeMode={"cover"}
					// Required properties which aren't specified in the Solito Image documentation
					contentFit={""}
					onLayout={() => {}}
				/>
			</Box>

			<Box
				backgroundColor='$dark'
				borderRadius={8}
				padding={32}
				sx={{
					"@base": {
						height: "$full",
						gap: 24
					},
					"@md": {
						height: 376,
						flexDirection: "row",
						gap: 32,
						justifyContent: "center",
						width: 750,
						margin: "0 auto"
					}
				}}
			>
				<Box
					gap={24}
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
						You will be given the chance to score 50 video clips of cows walking and will receive feedback on your
						scores once you are finished.
					</Text>

					<TextLink
						textProps={{
							style: {
								color: config.tokens.colors.white,
								fontFamily: config.tokens.fonts.body,
								fontSize: 16,
								lineHeight: 24
							}
						}}
						href='https://roms.org.uk/contact-us/'
					>
						If you have questions about RoMS or this website,{" "}
						<Text style={{ color: config.tokens.colors.validError }}>please click here</Text>
					</TextLink>
				</Box>

				<Box justifyContent='center' alignItems='center'>
					<Button buttonText='Start' variant={ButtonVariant.LARGE} />
				</Box>
			</Box>
		</PageLayout>
	);
}
