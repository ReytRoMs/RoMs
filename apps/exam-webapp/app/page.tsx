"use client";

import { Box, Text } from "@gluestack-ui/themed";
import { Button, Dropdown, RadioButtons, ResultsTable, Textarea } from "../../../packages/ui/components";
import useSWR from "swr";
import { fetcher } from "ui";
import { Form, Formik } from "formik";
import { ButtonVariant } from "@repo/types";
import { z } from "zod";
import { useState } from "react";

export default function Home() {
	return (
		<main style={{ height: "100vh" }}>
			<Container />
		</main>
	);
}

const Container = () => {
	const { data: user } = useSWR("/api/user", fetcher);
	const { data: videos } = useSWR("/api/videos", fetcher);

	const [initialValues] = useState({
		answer: "",
		details: "",
		primaryRole: ""
	});

	return (
		<Box>
			<Box flex={1} backgroundColor='$background'>
				<Box alignItems='center'>
					<Text>{`Hello ${user?.UsersPrimaryRole ?? "you"}!`}</Text>
					<Text mb='$16'>{`First video ID: ${videos?.[0]?.youtube_id ?? "loading..."}`}</Text>

					<Button buttonText='Primary' variant={ButtonVariant.PRIMARY}></Button>
					<Button buttonText='Primary' variant={ButtonVariant.PRIMARY} isDisabled></Button>

					<Button buttonText='Secondary' variant={ButtonVariant.SECONDARY}></Button>
					<Button buttonText='Secondary' variant={ButtonVariant.SECONDARY} isDisabled></Button>

					<Button buttonText='Large' variant={ButtonVariant.LARGE}></Button>
				</Box>

				<Box
					style={{
						padding: 16
					}}
				>
					<ResultsTable
						results={[
							{
								correctAnswer: "1. Acceptable Mobility",
								yourAnswer: "1. Acceptable Mobility",
								videoId: "Yo5Ix32Rc2o"
							},
							{
								correctAnswer: "2. Good Mobility",
								yourAnswer: "2. Acceptable Mobility",
								videoId: "h7k6P12gfic"
							},
							{
								correctAnswer: "3. Imperfect Mobility",
								yourAnswer: "3. Imperfect Mobility",
								videoId: "FavUpD_IjVY"
							},
							{
								correctAnswer: "4. Impaired Mobility",
								yourAnswer: "4. Acceptable Mobility",
								videoId: "jQQTmuOEPLU"
							},
							{
								correctAnswer: "5. Severely impaired mobility",
								yourAnswer: "5. Severely impaired mobility",
								videoId: "huT5__BqY_U"
							}
						]}
					/>
				</Box>

				<Formik
					initialValues={initialValues}
					onSubmit={(values) => {
						console.log("Handle submit of values", values);
					}}
					enableReinitialize
					validateOnBlur={true}
					validateOnChange={false}
					validate={(values) => {
						const schema = z.object({
							answer: z.string({ required_error: "Please complete" }).min(1, { message: "Please complete" }),
							details: z.string({ required_error: "Please complete" }).min(1, { message: "Please complete" }),
							primaryRole: z.string({ required_error: "Please complete" }).min(1, { message: "Please complete" })
						});

						// Parse the schema with the form values
						const response = schema.safeParse(values);

						// Check to see if there is any errors with the form
						if (response.success === false) {
							let errors: Partial<typeof initialValues> = {};

							// Map the Zod errors to Formik errors shape
							response.error.errors.map((value) => {
								errors = {
									...errors,
									[value.path[0]]: value.message
								};
							});

							return errors;
						}
					}}
				>
					{({ handleSubmit }) => (
						<>
							<Form style={{ width: "100%", marginLeft: "auto", marginRight: "auto", maxWidth: 900, flex: 1 }}>
								<RadioButtons
									options={[
										{ label: "1. Acceptable Mobility", value: "1", isDisabled: false },
										{ label: "2. Lame", value: "2", isDisabled: false },
										{ label: "3. Very Lame", value: "3", isDisabled: false }
									]}
									name='answer'
								/>

								<Textarea name='details' placeholder='Provide Details' />

								<Dropdown
									name='primaryRole'
									options={[
										{ id: "1", label: "Vet", value: "12", disabled: false },
										{ id: "2", label: "Farmer", value: "13", disabled: false }
									]}
									label={"What is your primary role?"}
									placeholder='Please Select'
								/>

								<Button
									marginTop={20}
									buttonText='Submit'
									variant={ButtonVariant.PRIMARY}
									onPress={() => {
										handleSubmit();
									}}
									width={"$full"}
								/>
							</Form>
						</>
					)}
				</Formik>
			</Box>
		</Box>
	);
};
