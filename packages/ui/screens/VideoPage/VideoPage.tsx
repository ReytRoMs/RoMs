"use client";

import { Box, Spinner, Text, View } from "@gluestack-ui/themed";
import { Formik } from "formik";

import { PageLayout } from "../shared";
import { MustContain } from "../../components/Inputs/shared";

import "./VideoPage.css";
import { AnswerFormData } from "./types";
import { useQuestionAction, useQuestionLoader } from "./hooks";
import { VideoPageForm } from "./VideoPageForm";

const initialFormData: AnswerFormData = { answer: undefined };

export const VideosPage = () => {
	const { question, questionError, isFetchingQuestion, isValidatingQuestion } = useQuestionLoader();
	const { postVideoAnswer, postVideoAnswerError, isPostingVideoAnswer } = useQuestionAction();

	// Handles any question loading errors
	if ((questionError?.info?.reasons?.length ?? 0) > 0) {
		return (
			<PageLayout contentDirection='row' contentStyling={{ justifyContent: "center" }}>
				<View marginBottom={"$5"} alignItems='center' width={"$full"}>
					{questionError?.info?.reasons?.map((error) => {
						return <MustContain message={error} key={error} />;
					}) ?? null}
				</View>
			</PageLayout>
		);
	}

	// Handles loading of the initial question
	if (isFetchingQuestion || question?.allQuestionsAreAnswered === true) {
		return (
			<PageLayout contentDirection='row' contentStyling={{ justifyContent: "center" }}>
				<Spinner size={"large"} color={"$validError"} />
			</PageLayout>
		);
	}

	return (
		<PageLayout contentDirection='row' contentStyling={{ paddingTop: "$16" }}>
			<>
				<iframe
					src={`https://www.youtube.com/embed/${question?.youtubeId}?autoplay=1&mute=1&rel=0`}
					title='YouTube video player'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					allowFullScreen
				/>

				<Box
					flex={0.5}
					gap={40}
					sx={{
						"@md": {
							maxWidth: 325
						}
					}}
				>
					<Formik
						initialValues={initialFormData}
						onSubmit={(values) => {
							postVideoAnswer({
								questionId: question?.questionId ?? "",
								answer: values.answer
							});
						}}
						enableReinitialize
						key={question?.questionId} // Every time the question id changes reset the form values back to the original values
					>
						{({ handleSubmit }) => (
							<VideoPageForm
								isDisabled={isPostingVideoAnswer || isValidatingQuestion}
								onSubmit={() => {
									handleSubmit();
								}}
								reasons={postVideoAnswerError?.info?.reasons ?? []}
							/>
						)}
					</Formik>

					<Box justifyContent='center' alignItems='center'>
						<Text variant='header' fontWeight='$bold'>
							{(question?.order ?? 0) + 1 ?? 0} of {question?.total}
						</Text>
					</Box>
				</Box>
			</>
		</PageLayout>
	);
};
