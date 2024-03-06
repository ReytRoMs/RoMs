"use client";

import { Box } from "@gluestack-ui/themed";

import { CompanyLogo, PageLayout } from "../shared";
import { WelcomeText } from "./WelcomeText";
import { StartButton } from "./StartButton";

export const StartPage = () => {
	return (
		<PageLayout>
			<CompanyLogo />

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
				<WelcomeText />
				<StartButton />
			</Box>
		</PageLayout>
	);
};
