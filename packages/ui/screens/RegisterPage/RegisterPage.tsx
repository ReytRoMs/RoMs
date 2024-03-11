"use client";

import { Formik } from "formik";

import { CompanyLogo, PageLayout } from "../shared";

import { validateSignUpFormData } from "./validateForm";
import { RegisterPageForm } from "./RegisterPageForm";
import { SignUpFormData } from "./types";
import { useRegisterAction } from "./hooks";

const initialFormData: SignUpFormData = {
	areYouACurrentRoMsMember: undefined,
	role: undefined
};

export const RegisterPage = () => {
	const { createUserSession, createUserSessionError, isSubmittingUserSessionDetails } = useRegisterAction();

	return (
		<PageLayout contentDirection='column'>
			<CompanyLogo />

			<Formik
				initialValues={initialFormData}
				onSubmit={(values) => {
					createUserSession(values);
				}}
				validate={(values) => {
					return validateSignUpFormData(values);
				}}
				validateOnBlur
				validateOnChange={false}
			>
				<RegisterPageForm
					reasons={createUserSessionError?.info?.reasons ?? []}
					isFormSubmitting={isSubmittingUserSessionDetails}
				/>
			</Formik>
		</PageLayout>
	);
};
