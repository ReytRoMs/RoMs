"use client";

import { Box } from "@gluestack-ui/themed";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main>
			{/* @ts-ignore */}
			<Box backgroundColor='$background' $web-minHeight={"100vh"}>
				<Box padding={32} marginTop={"auto"} marginBottom={"auto"}>
					{children}
				</Box>

				<div className='footer' />
			</Box>
		</main>
	);
};
