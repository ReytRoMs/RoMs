import { Box, Text } from "@gluestack-ui/themed";

import { IResultsTableData } from "@repo/types";
import { config } from "../../config/gluestack-ui.config";
import { TextLink } from "solito/link";

const Score = ({
	label,
	description,
	href = "https://roms.org.uk/contact-us/",
	score = 0
}: {
	label: string;
	description: string;
	href?: string;
	score?: number;
}) => {
	return (
		<Box gap={"$4"}>
			<Box alignItems='center'>
				<Text variant='body'>{label}</Text>

				<TextLink
					textProps={{
						style: {
							color: config.tokens.colors.textBody,
							fontFamily: config.tokens.fonts.body,
							fontSize: config.tokens.fontSizes["xs"],
							lineHeight: config.tokens.lineHeights["sm"]
						}
					}}
					href={href}
					target='_blank'
				>
					<Text>{description}</Text>
				</TextLink>
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
		<Box
			flexDirection='row'
			justifyContent='center'
			paddingBottom={"$16"}
			gap={20}
			flexWrap='wrap'
			sx={{
				"@md": {
					justifyContent: "space-between"
				}
			}}
		>
			{/* TODO: Add correct link when available */}
			<Score label='Accuracy' description='The number of correct answers' score={accuracy} />

			<Score label='Sensitivity' description='Ability to identify score 2 or 3 cows' score={sensitivity} />

			<Score label='Specificity' description='Ability to identify score 0 or 1 cows' score={specificity} />
		</Box>
	);
};
