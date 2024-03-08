"use client";

import { Formik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";

import { CompanyLogo, PageLayout } from "../shared";
import { validateSignUpFormData } from "./validateForm";
import { RegisterPageForm } from "./RegisterPageForm";
import { UserSessionResponse, SignUpFormData } from "./types";
import { createUserSessionAction } from "./actions";
import { IClientError } from "../shared/types";

export const RegisterPage = () => {
	const [initialValues] = useState<SignUpFormData>({
		areYouACurrentRoMsMember: undefined,
		role: undefined
	});

	const router = useRouter();

	const { trigger: createUserSession, error: createUserSessionError } = useSWRMutation<
		UserSessionResponse,
		IClientError,
		string,
		SignUpFormData
	>("/api/user", createUserSessionAction, {
		onSuccess: () => {
			router.push("/video");
		}
	});

	return (
		<PageLayout contentDirection='column'>
			<CompanyLogo />

			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					createUserSession(values);
				}}
				validate={(values) => {
					return validateSignUpFormData(values);
				}}
				validateOnBlur
				validateOnChange={false}
			>
				<RegisterPageForm reasons={createUserSessionError?.info?.reasons ?? []} />
			</Formik>
		</PageLayout>
	);
};
