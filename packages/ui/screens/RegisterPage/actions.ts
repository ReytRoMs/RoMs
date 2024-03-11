import { post } from "../../lib";
import { SignUpFormData, UserSessionResponse } from "./types";

export const createUserSessionAction = async (url: string, { arg }: { arg: SignUpFormData }) => {
	const data = post<{ isCurrentRomsMember: boolean; usersPrimaryRole: string }, UserSessionResponse>({
		url,
		data: {
			isCurrentRomsMember: arg.areYouACurrentRoMsMember === "yes",
			usersPrimaryRole: arg?.role ?? ""
		}
	});

	return data;
};
