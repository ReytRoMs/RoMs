"use client";

import "./PageLayout.css";

import { Box } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

interface IPageLayout {
	children: React.ReactNode;
	contentDirection?: ComponentProps<typeof Box>["flexDirection"];
	contentStyling?: Omit<
		ComponentProps<typeof Box>,
		"padding" | "marginTop" | "marginBottom" | "gap" | "flexDirection" | "width" | "sx"
	>;
}

export const PageLayout = ({ children, contentDirection = "column", contentStyling }: IPageLayout) => {
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
					paddingHorizontal={"$6"}
					paddingVertical={"$12"}
					marginTop={"auto"}
					marginBottom={"auto"}
					gap={40}
					flexDirection={"column"}
					width={"$full"}
					sx={{
						"@md": {
							flexDirection: contentDirection,
							paddingHorizontal: "$16",
							paddingVertical: "unset",
							...contentStyling
						}
					}}
				>
					{children}
				</Box>
			</Box>

			<footer />
		</main>
	);
};
