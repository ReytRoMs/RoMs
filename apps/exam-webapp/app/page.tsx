"use client";

import { Box, Text } from "@gluestack-ui/themed";
import { Button, RadioButtons, Textarea } from "../../../packages/ui/components";
import useSWR from "swr";
import { fetcher } from "ui";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ButtonVariant } from "@repo/types";

export default function Home() {
	return (
		<main>
			<Container />
		</main>
	);
}

const Container = () => {
	const { data: user } = useSWR("/api/user", fetcher);
	const { data: videos } = useSWR("/api/videos", fetcher);

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

				<Formik
					initialValues={{
						answer: "",
						details: ""
					}}
					onSubmit={(values) => {
						console.log("Handle submit of values", values);
					}}
					enableReinitialize
					validationSchema={Yup.object().shape({
						answer: Yup.string().required("Please complete"),
						details: Yup.string().required("Please complete")
					})}
					validateOnBlur={true}
					validateOnChange={false}
				>
					{({ handleSubmit }) => (
						<>
							<Form style={{ width: "100%", marginLeft: "auto", marginRight: "auto", maxWidth: 900 }}>
								<RadioButtons
									options={[
										{ label: "1. Acceptable Mobility", value: "1", isDisabled: false },
										{ label: "2. Lame", value: "2", isDisabled: false },
										{ label: "3. Very Lame", value: "3", isDisabled: false }
									]}
									name='answer'
								/>

								<Textarea name='details' placeholder='Provide Details' />

								<Button
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
