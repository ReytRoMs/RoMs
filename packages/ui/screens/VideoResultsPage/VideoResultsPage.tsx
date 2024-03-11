"use client";

import { Box, Spinner, View } from "@gluestack-ui/themed";

import { PageLayout } from "../shared";
import { ResultsTable } from "../..";
import { useQuestionResultsLoader } from "./hooks";
import { MustContain } from "../../components/Inputs/shared";
import { VideoResultsScore } from "./VideoResultsScore";
import { VideoResultsScores } from "./VideoResultsScores";

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
			<VideoResultsScore
				percentageCorrect={questionResults?.percentageCorrect ?? 0}
				totalNumberOfCorrectAnswers={questionResults?.totalNumberOfCorrectAnswers ?? 0}
				totalNumberOfQuestions={questionResults?.totalNumberOfQuestions ?? 0}
			/>

			<Box flex={1}>
				<VideoResultsScores
					accuracy={questionResults?.scores?.accuracy ?? 0}
					sensitivity={questionResults?.scores?.sensitivity ?? 0}
					specificity={questionResults?.scores?.sensitivity ?? 0}
				/>

				<ResultsTable results={questionResults?.results ?? []} />
			</Box>
		</PageLayout>
	);
};
