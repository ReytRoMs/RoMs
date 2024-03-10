import { IQuestion } from "@repo/types";
import { get } from "../../lib";

export const getQuestionLoader = async (url: string) => {
	const question = get<IQuestion>({ url: url });
	return question;
};
