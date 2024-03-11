import { get } from "../../lib";
import { IQuestion } from "./types";

export const getQuestionLoader = async (url: string) => {
	const question = get<IQuestion>({ url: url });
	return question;
};
