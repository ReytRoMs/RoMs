import { useSWRConfig } from "swr";

import { Box, Text } from "@gluestack-ui/themed";
import { useRouter } from "next/navigation";

import { ButtonVariant } from "@repo/types";
import { Button } from "../../components";

interface IVideoResultsScore {
	percentageCorrect: number;
	totalNumberOfCorrectAnswers: number;
	totalNumberOfQuestions: number;
}

export const VideoResultsScore = ({
	percentageCorrect,
	totalNumberOfCorrectAnswers,
	totalNumberOfQuestions
}: IVideoResultsScore) => {
	const router = useRouter();

	const swrConfig = useSWRConfig();

	const resultColor = percentageCorrect >= 75 ? "$green" : percentageCorrect >= 60 ? "$amber" : "$validError";

	return (
		<Box justifyContent='space-between' gap={"$2"} height={560}>
			<Box
				position='relative'
				justifyContent='center'
				alignItems='center'
				sx={{
					"@md": {
						justifyContent: "flex-start",
						alignItems: "flex-start"
					}
				}}
			>
				<Box width={272} height={272} backgroundColor={resultColor} borderRadius={"$full"}>
					<Box justifyContent='center' alignItems='center' flex={1} gap={"$2"} flexDirection='column'>
						<Text variant='extraLargeHeader' fontWeight='$extrabold' lineHeight={"$6xl"} paddingBottom={"$2"}>
							{percentageCorrect}%
						</Text>
					</Box>
				</Box>
			</Box>

			<Box alignItems='center' justifyContent='center' gap={"$4"}>
				<Text variant='body'>You scored</Text>

				<Text variant='header2' fontWeight='$bold'>
					{totalNumberOfCorrectAnswers} out of {totalNumberOfQuestions}
				</Text>
			</Box>

			<Box>
				<Button
					variant={ButtonVariant.PRIMARY}
					buttonText='Start Again'
					onPress={() => {
						router.push("/register");

						swrConfig.cache.delete("/api/results");
					}}
				/>
			</Box>
		</Box>
	);
};
