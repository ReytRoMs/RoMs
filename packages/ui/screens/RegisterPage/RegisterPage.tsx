"use client";

import { Formik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { CompanyLogo, PageLayout } from "../shared";
import { SignUpFormData, validateSignUpFormData } from "./validateForm";
import { RegisterPageForm } from "./RegisterPageForm";

export const RegisterPage = () => {
	const [initialValues] = useState<SignUpFormData>({
		areYouACurrentRoMsMember: undefined,
		role: undefined
	});

	const router = useRouter();

	return (
		<PageLayout>
			<CompanyLogo />

			<Formik
				initialValues={initialValues}
				onSubmit={() => {
					// TODO: Call api and get the next video

					router.push("/videos");
				}}
				validate={(values) => {
					return validateSignUpFormData(values);
				}}
				validateOnBlur
				validateOnChange={false}
			>
				<RegisterPageForm />
			</Formik>
		</PageLayout>
	);
};
