"use client";

import { Box, Spinner, Text, View } from "@gluestack-ui/themed";
import { Form, Formik } from "formik";
import useSWRMutation from "swr/mutation";
import useSWR, { useSWRConfig } from "swr";

import { RadioButtons } from "ui";
import "VideoPage.css";
import { AnswerOption } from "database";
import { PageLayout } from "../shared";
import { IClientError } from "../shared/types";
import { postVideoAnswerAction } from "./actions";
import { AnswerFormData, AnswerRoutePayload, IQuestion } from "./types";
import { getVideoLoader } from "./loader";
import { MustContain } from "../../components/Inputs/shared";

const answerOptions = [
	{ label: "0. Good mobility ", value: AnswerOption.GOOD, isDisabled: false },
	{ label: "1. Imperfect mobility ", value: AnswerOption.IMPERFECT, isDisabled: false },
	{ label: "2. Impaired mobility ", value: AnswerOption.IMPAIRED, isDisabled: false },
	{ label: "3. Severely impaired mobility", value: AnswerOption.SEVERELY_IMPAIRED, isDisabled: false }
];

const initialFormData: AnswerFormData = { answer: undefined };

export const VideosPage = () => {
	const swrConfig = useSWRConfig();

	const {
		data: question,
		error: questionErrorMessage,
		isLoading: isFetchingQuestion
	} = useSWR<IQuestion, IClientError>("/api/question", getVideoLoader, {
		keepPreviousData: true,
		revalidateOnFocus: false
	});

	const { trigger: postVideoAnswer, error: postVideoAnswerError } = useSWRMutation<
		null,
		IClientError,
		string,
		AnswerRoutePayload
	>("/api/answer", postVideoAnswerAction, {
		onSuccess: () => {
			swrConfig.mutate("/api/question");
		}
	});

	if ((questionErrorMessage?.info?.reasons?.length ?? 0) > 0) {
		return (
			<PageLayout contentDirection='row' contentStyling={{ justifyContent: "center" }}>
				<View marginBottom={"$5"} alignItems='center' width={"$full"}>
					{questionErrorMessage?.info?.reasons?.map((error) => {
						return <MustContain message={error} key={error} />;
					}) ?? null}
				</View>
			</PageLayout>
		);
	}

	if (isFetchingQuestion) {
		return (
			<PageLayout contentDirection='row' contentStyling={{ justifyContent: "center" }}>
				<Spinner size={"large"} />
			</PageLayout>
		);
	}

	return (
		<PageLayout contentDirection='row'>
			<>
				<iframe
					src={`https://www.youtube.com/embed/${question?.youtubeId}?showinfo=0`}
					title='YouTube video player'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					allowFullScreen
				/>

				<Box
					flex={0.5}
					gap={40}
					sx={{
						"@lg": {
							maxWidth: 272
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
						key={question?.questionId}
					>
						{({ handleSubmit }) => (
							<Form style={{ marginBottom: "auto" }}>
								<RadioButtons
									options={answerOptions}
									name='answer'
									onChange={() => {
										handleSubmit();
									}}
								/>

								{(postVideoAnswerError?.info?.reasons?.length ?? 0) > 0 && (
									<View marginBottom={"$5"} alignItems='center'>
										{postVideoAnswerError?.info?.reasons?.map((error) => <MustContain message={error} key={error} />) ??
											null}
									</View>
								)}
							</Form>
						)}
					</Formik>

					<Box justifyContent='center' alignItems='center'>
						<Text variant='header' fontWeight='$bold'>
							1 of 20
						</Text>
					</Box>
				</Box>
			</>
		</PageLayout>
	);
};
