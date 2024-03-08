import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { SignUpFormData, UserSessionResponse } from "./types";
import { IClientError } from "../shared/types";
import { createUserSessionAction } from "./actions";

export const useRegisterAction = () => {
	const router = useRouter();

	const {
		trigger: createUserSession,
		error: createUserSessionError,
		isMutating: isSubmittingUserSessionDetails
	} = useSWRMutation<UserSessionResponse | null, IClientError, string, SignUpFormData>(
		"/api/user",
		createUserSessionAction,
		{
			onSuccess: () => {
				router.push("/video");
			}
		}
	);

	return {
		createUserSession,
		createUserSessionError,
		isSubmittingUserSessionDetails
	};
};
