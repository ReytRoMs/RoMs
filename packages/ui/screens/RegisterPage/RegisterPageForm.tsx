"use client";

import { Form, useFormikContext } from "formik";

import { Box } from "@gluestack-ui/themed";
import React from "react";
import { useRouter } from "next/navigation";

import { Button, Dropdown, RadioButtons } from "../../components";
import { ButtonVariant } from "@repo/types";

// TODO: Set the "value" property to the correct api va
const roles = [
	{ id: "1", label: "Farmer", value: "1", disabled: false },
	{ id: "2", label: "Specialist scorer", value: "2", disabled: false },
	{ id: "3", label: "Auditor", value: "3", disabled: false },
	{ id: "4", label: "Researcher", value: "4", disabled: false },
	{ id: "5", label: "Hoof trimmer", value: "5", disabled: false },
	{ id: "6", label: "Consultant/nutritionist", value: "5", disabled: false },
	{ id: "7", label: "Other", value: "6", disabled: false }
];

export const RegisterPageForm = () => {
	const { handleSubmit } = useFormikContext();

	const router = useRouter();

	return (
		<Form>
			<Box
				backgroundColor='transparent'
				borderRadius={8}
				padding={32}
				sx={{
					"@base": {
						height: "$full",
						gap: 24
					},
					"@md": {
						flexDirection: "row",
						gap: 32,
						justifyContent: "center",
						width: 750,
						margin: "0 auto"
					}
				}}
			>
				<Box
					gap={24}
					sx={{
						"@base": {
							width: "$full"
						},
						"@md": {
							width: 500
						}
					}}
				>
					<Box gap={16}>
						<RadioButtons
							options={[
								{ label: "Yes", value: "yes", isDisabled: false },
								{ label: "No", value: "no", isDisabled: false }
							]}
							name='areYouACurrentRoMsMember'
							width={100}
							direction='row'
							label='Are you current RoMS member?'
						/>

						<Dropdown name='role' options={roles} label={"What is your primary role?"} />
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					"@md": {
						flexDirection: "row",
						justifyContent: "space-between",
						maxWidth: 750,
						marginRight: "auto",
						marginLeft: "auto"
					}
				}}
			>
				<Button
					variant={ButtonVariant.PRIMARY}
					buttonText='Continue'
					onPress={() => {
						handleSubmit();
					}}
					sx={{
						"@md": {
							maxWidth: 200
						}
					}}
				/>

				<Button
					variant={ButtonVariant.SECONDARY}
					buttonText='Cancel'
					sx={{
						"@md": {
							maxWidth: 200
						}
					}}
					onPress={() => {
						router.push("/");
					}}
				/>
			</Box>
		</Form>
	);
};
