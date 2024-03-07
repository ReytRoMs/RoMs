"use client";

import { PageLayout } from "../shared";
import { Box, Text } from "@gluestack-ui/themed";
import { AnswerOption } from "database";
import { Form, Formik } from "formik";
import { useState } from "react";
import { RadioButtons } from "ui";
import "./VideoPage.css";

const answerOptions = [
	{ label: "0. Good mobility ", value: AnswerOption.GOOD, isDisabled: false },
	{ label: "1. Imperfect mobility ", value: AnswerOption.IMPERFECT, isDisabled: false },
	{ label: "2. Impaired mobility ", value: AnswerOption.IMPAIRED, isDisabled: false },
	{ label: "3. Severely impaired mobility", value: AnswerOption.SEVERELY_IMPAIRED, isDisabled: false }
];

export const VideosPage = () => {
	const [initialValues] = useState({
		answer: undefined
	});

	return (
		<PageLayout contentDirection='row'>
			<>
				<iframe
					src='https://www.youtube.com/embed/bCrz03-OJtY?si=ESoaX9CB6LxirQeI?showinfo=0'
					title='YouTube video player'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					allowFullScreen
				/>

				<Box
					flex={0.5}
					gap={40}
					sx={{
						"@md": {
							maxWidth: 272
						}
					}}
				>
					<Formik
						initialValues={initialValues}
						onSubmit={() => {
							// console.log("submitting form", values);
						}}
						enableReinitialize
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
