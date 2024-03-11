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
	{ id: UsersPrimaryRole.FARMER, label: "Farmer", value: UsersPrimaryRole.FARMER, isDisabled: false },
	{
		id: UsersPrimaryRole.SPECIALIST_SCORER,
		label: "Specialist scorer",
		value: UsersPrimaryRole.SPECIALIST_SCORER,
		isDisabled: false
	},
	{ id: UsersPrimaryRole.AUDITOR, label: "Auditor", value: UsersPrimaryRole.AUDITOR, isDisabled: false },
	{ id: UsersPrimaryRole.RESEARCHER, label: "Researcher", value: UsersPrimaryRole.RESEARCHER, isDisabled: false },
	{ id: UsersPrimaryRole.HOOF_TRIMMER, label: "Hoof trimmer", value: UsersPrimaryRole.HOOF_TRIMMER, isDisabled: false },
	{
		id: UsersPrimaryRole.CONSULTANT_OR_NUTRITIONIST,
		label: "Consultant/nutritionist",
		value: UsersPrimaryRole.CONSULTANT_OR_NUTRITIONIST,
		isDisabled: false
	},
	{ id: "OTHER", label: "Other", value: "OTHER", isDisabled: false }
];

interface IRegisterPageForm extends Pick<IErrorResponse, "reasons"> {
	isFormSubmitting: boolean;
}

export const RegisterPageForm = ({ reasons, isFormSubmitting }: IRegisterPageForm) => {
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
							height={100}
							direction='row'
							label='Are you current RoMS member?'
							isDisabled={isFormSubmitting === true}
						/>

						<Dropdown
							name='role'
							options={roles}
							label={"What is your primary role?"}
							isDisabled={isFormSubmitting === true}
						/>
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
					isDisabled={isFormSubmitting === true}
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
					isDisabled={isFormSubmitting === true}
					onPress={() => {
						router.push("/");
					}}
				/>
			</Box>
		</Form>
	);
};
