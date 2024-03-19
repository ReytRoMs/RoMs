"use client";

import { Box } from "@gluestack-ui/themed";
import { SolitoImage } from "solito/image";

export const CompanyLogo = () => {
	return (
		<Box justifyContent='center' alignItems='center'>
			<SolitoImage
				alt={`RoMS company logo `}
				src={{
					src: `/logo.png`,
					width: 216,
					height: 60
				}}
				style={{ paddingTop: 50 }}
				resizeMode={"cover"}
				// Required properties which aren't specified in the Solito Image documentation
				contentFit={""}
				onLayout={() => {}}
			/>
		</Box>
	);
};
