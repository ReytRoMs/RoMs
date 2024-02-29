"use client";

import { Box, Text } from "@gluestack-ui/themed";
import { Button, ButtonVariant } from "../../../packages/ui/components";
import useSWR from "swr";
import { fetcher } from "ui";

export default function Home() {
	return (
		<main>
			<Container />
		</main>
	);
}

const Container = () => {
	const { data: user } = useSWR("/api/user", fetcher);
	const { data: videos } = useSWR("/api/videos", fetcher);

	return (
		// @ts-expect-error web-h doesn't seem to exists in BoxProps
		<Box flex={1} backgroundColor='$background' $web-h={"100vh"}>
			<Box flex={1} $base-my={"$16"} $base-mx={"$5"} $lg-my={"$24"} $lg-mx={"$32"} alignItems='center'>
				<Text>{`Hello ${user?.UsersPrimaryRole ?? "you"}!`}</Text>
				<Text mb='$16'>{`First video ID: ${videos?.[0]?.youtube_id ?? "loading..."}`}</Text>

				<Button buttonText='Primary' variant={ButtonVariant.PRIMARY}></Button>
				<Button buttonText='Primary' variant={ButtonVariant.PRIMARY} isDisabled></Button>

				<Button buttonText='Secondary' variant={ButtonVariant.SECONDARY}></Button>
				<Button buttonText='Secondary' variant={ButtonVariant.SECONDARY} isDisabled></Button>

				<Button buttonText='Large' variant={ButtonVariant.LARGE}></Button>
			</Box>
		</Box>
	);
};
