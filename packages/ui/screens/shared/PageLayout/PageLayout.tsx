"use client";

import "./PageLayout.css";

import { Box } from "@gluestack-ui/themed";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main>
			{/* @ts-ignore */}
			<Box backgroundColor='$background' $web-minHeight={"100vh"}>
				<Box padding={"$8"} marginTop={"auto"} marginBottom={"auto"}>
					{children}
				</Box>
				<footer />
			</Box>
		</main>
	);
};
