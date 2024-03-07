"use client";

import { Form, useFormikContext } from "formik";
import { Box, View } from "@gluestack-ui/themed";
import { useRouter } from "next/navigation";

import { Button, Dropdown, RadioButtons } from "../../components";
import { ButtonVariant } from "@repo/types";
import { MustContain } from "../../components/Inputs/shared";
import { IErrorResponse } from "../shared/types";
import { UsersPrimaryRole } from "database";

const roles = [
	{ id: UsersPrimaryRole.FARMER, label: "Farmer", value: UsersPrimaryRole.FARMER, disabled: false },
	{
		id: UsersPrimaryRole.SPECIALIST_SCORER,
		label: "Specialist scorer",
		value: UsersPrimaryRole.SPECIALIST_SCORER,
		disabled: false
	},
	{ id: UsersPrimaryRole.AUDITOR, label: "Auditor", value: UsersPrimaryRole.AUDITOR, disabled: false },
	{ id: UsersPrimaryRole.RESEARCHER, label: "Researcher", value: UsersPrimaryRole.RESEARCHER, disabled: false },
	{ id: UsersPrimaryRole.HOOF_TRIMMER, label: "Hoof trimmer", value: UsersPrimaryRole.HOOF_TRIMMER, disabled: false },
	{
		id: UsersPrimaryRole.CONSULTANT_OR_NUTRITIONIST,
		label: "Consultant/nutritionist",
		value: UsersPrimaryRole.CONSULTANT_OR_NUTRITIONIST,
		disabled: false
	},
	{ id: "OTHER", label: "Other", value: "OTHER", disabled: false }
];

export const RegisterPageForm = ({ reasons }: Pick<IErrorResponse, "reasons">) => {
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

			{(reasons?.length ?? 0) > 0 && (
				<View marginBottom={"$5"} alignItems='center'>
					{reasons?.map((error) => <MustContain message={error} key={error} />) ?? null}
				</View>
			)}

			<Box
				flexDirection='column'
				sx={{
					"@md": {
						flexDirection: "row-reverse",
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
