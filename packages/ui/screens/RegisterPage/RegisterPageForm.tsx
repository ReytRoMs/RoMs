"use client";

import { Form, useFormikContext } from "formik";
import { Box, View } from "@gluestack-ui/themed";
import { useRouter } from "next/navigation";

import { Button, Dropdown, RadioButtons } from "../../components";
import { ButtonVariant, IErrorResponse } from "@repo/types";
import { MustContain } from "../../components/Inputs/shared";

// TODO: Swap out values to read from the prisma client
const roles = [
	{ id: "FARMER", label: "Farmer", value: "FARMER", disabled: false },
	{ id: "SPECIALIST_SCORER", label: "Specialist scorer", value: "SPECIALIST_SCORER", disabled: false },
	{ id: "AUDITOR", label: "Auditor", value: "AUDITOR", disabled: false },
	{ id: "RESEARCHER", label: "Researcher", value: "RESEARCHER", disabled: false },
	{ id: "HOOF_TRIMMER", label: "Hoof trimmer", value: "HOOF_TRIMMER", disabled: false },
	{
		id: "CONSULTANT_OR_NUTRITIONIST",
		label: "Consultant/nutritionist",
		value: "CONSULTANT_OR_NUTRITIONIST",
		disabled: false
	},
	{ id: "OTHER", label: "Other", value: "OTHER", disabled: false }
];

export const RegisterPageForm = ({ errorReasons }: Pick<IErrorResponse, "errorReasons">) => {
	const { handleSubmit } = useFormikContext();

	const router = useRouter();

	return (
		<Form>
			<Box
				backgroundColor='transparent'
				borderRadius={"$lg"}
				padding={"$8"}
				height={"$full"}
				gap={"$6"}
				sx={{
					"@md": {
						flexDirection: "row",
						gap: "$8",
						justifyContent: "center",
						width: 750,
						margin: "0 auto"
					}
				}}
			>
				<Box
					gap={"$6"}
					width={"$full"}
					sx={{
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

			{(errorReasons?.length ?? 0) > 0 && (
				<View marginBottom={"$5"} alignItems='center'>
					{errorReasons?.map((error) => <MustContain message={error} />) ?? null}
				</View>
			)}

			<Box
				flexDirection='column'
				sx={{
					"@md": {
						flexDirection: "reverse-row",
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
