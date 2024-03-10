"use client";

import { Box, Spinner, Text, View } from "@gluestack-ui/themed";

import { PageLayout } from "../shared";
import { Button, ResultsTable } from "../..";
import { useQuestionResultsLoader } from "./hooks";
import { ButtonVariant } from "@repo/types";
import { MustContain } from "../../components/Inputs/shared";

export const VideoResultsPage = () => {
	const { isFetchingQuestionResults, questionResults, questionResultsError } = useQuestionResultsLoader();

	// Handles any question loading errors
	if ((questionResultsError?.info?.reasons?.length ?? 0) > 0) {
		return (
			<PageLayout contentDirection='row' contentStyling={{ justifyContent: "center" }}>
				<View marginBottom={"$5"} alignItems='center' width={"$full"}>
					{questionResultsError?.info?.reasons?.map((error) => {
						return <MustContain message={error} key={error} />;
					}) ?? null}
				</View>
			</PageLayout>
		);
	}

	// Handles loading of the initial question
	if (isFetchingQuestionResults) {
		return (
			<PageLayout contentDirection='row' contentStyling={{ justifyContent: "center" }}>
				<Spinner size={"large"} />
			</PageLayout>
		);
	}

	return (
		<PageLayout contentDirection='row' contentStyling={{ paddingTop: "$16" }}>
			<>
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
						<Box width={272} height={272} backgroundColor='$green' borderRadius={"$full"}>
							<Box justifyContent='center' alignItems='center' flex={1}>
								<Text variant='extraLargeHeader' fontWeight='$extrabold' lineHeight={"$6xl"}>
									{questionResults?.percentageCorrect}%
								</Text>
								<Text variant='body' fontWeight='$extrabold' color='$white' lineHeight={"$lg"}>
									Pass
								</Text>
							</Box>
						</Box>
					</Box>

					<Box alignItems='center' justifyContent='center' gap={"$4"}>
						<Text variant='body'>You scored</Text>

						<Text variant='header2' fontWeight='$bold'>
							{questionResults?.totalNumberOfCorrectAnswers} out of {questionResults?.totalNumberOfQuestions}
						</Text>
					</Box>

					<Box>
						<Button variant={ButtonVariant.PRIMARY} buttonText='Start Again' onPress={() => null} />
					</Box>
				</Box>

				<Box flex={1}>
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
						<Box gap={"$8"}>
							<Box alignItems='center'>
								<Text variant='small'>Accuracy</Text>
								<Text variant='body'>The number of correct answers</Text>
							</Box>
							<Box alignItems='center'>
								<Text variant='header2'>{questionResults?.scores?.accuracy ?? 0}</Text>
							</Box>
						</Box>

						<Box gap={"$8"}>
							<Box alignItems='center'>
								<Text variant='small'>Sensitivity</Text>
								<Text variant='body'>Ability to identify score 2 or 3 cows</Text>
							</Box>
							<Box alignItems='center'>
								<Text variant='header2'>{questionResults?.scores?.sensitivity ?? 0}</Text>
							</Box>
						</Box>

						<Box gap={"$8"}>
							<Box alignItems='center'>
								<Text variant='small'>Specificity</Text>
								<Text variant='body'>Ability to identify score 0 or 1 cows</Text>
							</Box>
							<Box alignItems='center'>
								<Text variant='header2'>{questionResults?.scores?.specificity ?? 0}</Text>
							</Box>
						</Box>
					</Box>

					<ResultsTable results={questionResults?.results ?? []} />
				</Box>
			</>
		</PageLayout>
	);
};
