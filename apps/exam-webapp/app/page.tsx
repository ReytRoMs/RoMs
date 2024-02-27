"use client";

import { Box } from "@gluestack-ui/themed";
import { Button } from "../../../packages/ui/components";

export default function Home() {
	return (
		<main>
			<Container />
		</main>
	);
}

const Container = () => {
	return (
		// @ts-ignore
		<Box flex={1} backgroundColor='$background' $web-h={"100vh"}>
			<Box flex={1} $base-my={"$16"} $base-mx={"$5"} $lg-my={"$24"} $lg-mx={"$32"} alignItems='center'>
				<Button buttonText='Start' variant='solid'></Button>
			</Box>
		</Box>
	);
};
