"use client";

import { Box, Text, View } from "@gluestack-ui/themed";

export default function Home() {
	return (
		<main>
			<Container />
		</main>
	);
}

const Container = () => {
	return (
		// <Box flex={1} backgroundColor='$background' $web-h={"100vh"}>
		<Box flex={1} $base-my={"$16"} $base-mx={"$5"} $lg-my={"$24"} $lg-mx={"$32"} alignItems='center'>
			Hello
		</Box>
		// </Box>
	);
};
