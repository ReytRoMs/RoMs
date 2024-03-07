"use client";

import "./PageLayout.css";

import { Box } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

interface IPageLayout {
	children: React.ReactNode;
	contentDirection?: ComponentProps<typeof Box>["flexDirection"];
}

export const PageLayout = ({ children, contentDirection = "column" }: IPageLayout) => {
	return (
		<main>
			{/* @ts-ignore */}
			<Box
				backgroundColor='$background'
				$web-minHeight={"100vh"}
				maxWidth={1440}
				margin='auto'
				paddingBottom={175}
				sx={{
					"@md": {
						paddingBottom: 294
					}
				}}
			>
				<Box
					padding={"$6"}
					marginTop={"auto"}
					marginBottom={"auto"}
					gap={40}
					flexDirection={"column"}
					width={"$full"}
					sx={{ "@md": { flexDirection: contentDirection, padding: "$16" } }}
				>
					{children}
				</Box>
			</Box>

			<footer />
		</main>
	);
};
