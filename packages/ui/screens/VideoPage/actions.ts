import { post } from "../../lib";
import { AnswerRoutePayload } from "./types";

export const postVideoAnswerAction = async (url: string, { arg }: { arg: AnswerRoutePayload }) => {
	const response = post<{ questionId: string; usersAnswer: string }, null>({
		url,
		data: {
			questionId: arg?.questionId ?? "",
			usersAnswer: arg?.answer ?? ""
		}
	});

	return response;
};
