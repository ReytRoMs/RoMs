"use client";

import { Box, Text } from "@gluestack-ui/themed";
import { PageLayout } from "ui";

import { SolitoImage } from "solito/image";

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

			<Text variant='body'>Form</Text>
		</PageLayout>
	);
}
