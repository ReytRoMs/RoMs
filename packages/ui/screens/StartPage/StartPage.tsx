"use client";

import { Box } from "@gluestack-ui/themed";

import { CompanyLogo, PageLayout } from "../shared";
import { WelcomeText } from "./WelcomeText";
import { StartButton } from "./StartButton";

export const StartPage = () => {
	return (
		<PageLayout contentDirection='column'>
			<CompanyLogo />

			<Box
				backgroundColor='$dark'
				borderRadius={"$lg"}
				padding={32}
				height={"$full"}
				gap={20}
				sx={{
					"@md": {
						height: 376,
						flexDirection: "row",
						gap: "$8",
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
