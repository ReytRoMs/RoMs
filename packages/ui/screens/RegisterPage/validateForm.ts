import { z } from "zod";
import { SignUpFormData } from "./types";

export const validateSignUpFormData = (formData: SignUpFormData) => {
	const schema = z.object({
		areYouACurrentRoMsMember: z.string({ required_error: "Please complete" }).min(1, { message: "Please complete" }),
		role: z.string({ required_error: "Please complete" }).min(1, { message: "Please complete" })
	});

	// Parse the schema with the form values
	const response = schema.safeParse(formData);

	// Check to see if there is any errors with the form
	if (response.success === false) {
		let errors: Partial<typeof formData> = {};

		// Map the Zod errors to Formik errors shape
		response.error.errors.map((value) => {
			if (value?.path?.length > 0) {
				errors = {
					...errors,
					[value.path[0]]: value.message
				};
			}
		});

		return errors;
	}

	return {};
};
