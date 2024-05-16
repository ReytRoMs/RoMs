import { Box, Text } from "@gluestack-ui/themed";

import { IResultsTableData } from "@repo/types";
import { config } from "../../config/gluestack-ui.config";

const Score = ({
	label,
	description,
	score = 0
}: {
	label: string;
	description: string;
	href?: string;
	score?: number;
}) => {
	return (
		<Box gap={"$3"}>
			<Box alignItems='center'>
				<Text variant='body' color={config.tokens.colors.white}>
					{label}
				</Text>

				<Text>{description}</Text>
			</Box>
			<Box alignItems='center'>
				<Text variant='header2' fontWeight='$bold'>
					{score ?? 0}
				</Text>
			</Box>
		</Box>
	);
};

export const VideoResultsScores = ({
	accuracy,
	sensitivity,
	specificity
}: Pick<IResultsTableData, "scores">["scores"]) => {
	return (
		<Box backgroundColor='$dark' borderRadius={"$lg"} padding={32} marginBottom={32}>
			<Box flexDirection='column' justifyContent='center'>
				<Text variant='header' fontWeight='800' marginBottom={10} textAlign='center'>
					Scoring Performance
				</Text>
				<a className='link-primary' href='https://roms.org.uk/newsletter-resources/' target='_blank'>
					How well do you identify score 2 & 3 versus 0 & 1 cows
				</a>
			</Box>
			<Box
				flexDirection='row'
				justifyContent='center'
				gap={20}
				marginTop={24}
				flexWrap='wrap'
				sx={{
					"@md": {
						justifyContent: "space-between"
					}
				}}
			>
				{/* TODO: Add correct link when available */}
				<Score label='Accuracy' description='Proportion of correct classifications' score={accuracy} />

				<Score label='Sensitivity' description='Ability to identify score 2 & 3 cows' score={sensitivity} />

				<Score label='Specificity' description='Ability to identify score 0 & 1 cows' score={specificity} />
			</Box>
		</Box>
	);
};
