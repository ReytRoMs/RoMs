"use client";

import { Box } from "@gluestack-ui/themed";
import { useRouter } from "next/navigation";

import { Button } from "../../components";
import { ButtonVariant } from "@repo/types";

export const StartButton = () => {
	const router = useRouter();

	return (
		<Box justifyContent='center' alignItems='center'>
			<Button
				buttonText='Start'
				variant={ButtonVariant.LARGE}
				onPress={() => {
					router.push("/register");
				}}
			/>
		</Box>
	);
};
