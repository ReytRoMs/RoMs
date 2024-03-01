"use client";

import { Box, Text } from "@gluestack-ui/themed";
import { Button, ButtonVariant, RadioButtons } from "../../../packages/ui/components";
import useSWR from "swr";
import { fetcher } from "ui";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export default function Home() {
	return (
		<main>
			<Container />
		</main>
	);
}

const Container = () => {
	const { data } = useSWR("/api/user", fetcher);

	const [formValues] = useState({
		answer: ""
	});

	return (
		<Box>
			<Box flex={1} alignItems='center' backgroundColor='$background'>
				<Text mb='$16'>{`Hello ${data?.UsersPrimaryRole ? data?.UsersPrimaryRole : "you"}!`}</Text>

				<Button buttonText='Primary' variant={ButtonVariant.PRIMARY}></Button>
				<Button buttonText='Primary' variant={ButtonVariant.PRIMARY} isDisabled></Button>

				<Button buttonText='Secondary' variant={ButtonVariant.SECONDARY}></Button>
				<Button buttonText='Secondary' variant={ButtonVariant.SECONDARY} isDisabled></Button>

				<Button buttonText='Large' variant={ButtonVariant.LARGE}></Button>

				<Formik
					initialValues={formValues}
					onSubmit={(values) => {
						console.log("Handle submit of values", values);
					}}
					enableReinitialize
					validationSchema={Yup.object().shape({
						answer: Yup.string().required("At least one option is required")
					})}
					validateOnBlur={true}
					validateOnChange={false}
				>
					{({ handleSubmit }) => (
						<>
							<Form>
								<RadioButtons
									options={[
										{ label: "1. Acceptable Mobility", value: "1", isDisabled: false },
										{ label: "2. Lame", value: "2", isDisabled: false },
										{ label: "3. Very Lame", value: "3", isDisabled: true }
									]}
									name='answer'
								/>
							</Form>

							<Button
								buttonText='Submit'
								variant={ButtonVariant.PRIMARY}
								onPress={() => {
									handleSubmit();
								}}
							/>
						</>
					)}
				</Formik>
			</Box>
		</Box>
	);
};
