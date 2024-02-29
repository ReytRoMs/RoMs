"use client";

import { Box, Text } from "@gluestack-ui/themed";
import { Button, ButtonVariant, RadioButtons } from "../../../packages/ui/components";
import useSWR from "swr";
import { fetcher } from "ui";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export default function Home() {
	return (
		<main>
			<Container />
		</main>
	);
}

const Container = () => {
	const { data } = useSWR("/api/user", fetcher);

	return (
		<Box flex={1} backgroundColor='$background'>
			{/* @ts-expect-error web-h doesn't seem to exists in BoxProps */}
			<Box flex={1} alignItems='center' $web-h={"100vh"}>
				<Text mb='$16'>{`Hello ${data?.UsersPrimaryRole ? data?.UsersPrimaryRole : "you"}!`}</Text>

				<Button buttonText='Primary' variant={ButtonVariant.PRIMARY}></Button>
				<Button buttonText='Primary' variant={ButtonVariant.PRIMARY} isDisabled></Button>

				<Button buttonText='Secondary' variant={ButtonVariant.SECONDARY}></Button>
				<Button buttonText='Secondary' variant={ButtonVariant.SECONDARY} isDisabled></Button>

				<Button buttonText='Large' variant={ButtonVariant.LARGE}></Button>

				<Formik
					initialValues={{
						answer: ""
					}}
					onSubmit={(values) => {
						console.log("Handle submit of values", values);
					}}
					enableReinitialize
					validationSchema={Yup.object().shape({
						answer: Yup.string().required("At least one option is required")
					})}
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
