import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { getQuestionLoader } from "./loader";
import { AnswerRoutePayload, IQuestion } from "./types";
import { IClientError } from "../shared/types";
import { postVideoAnswerAction } from "./actions";

export const useQuestionLoader = () => {
	const router = useRouter();

	const {
		data: question,
		error: questionError,
		isLoading: isFetchingQuestion
	} = useSWR<IQuestion, IClientError>("/api/question", getQuestionLoader, {
		keepPreviousData: true,
		revalidateOnFocus: false
	});

	// When there is no videos left redirect the user to the results page
	useEffect(() => {
		if (isFetchingQuestion === false && question?.allQuestionsAreAnswered === true) {
			router.replace("/video/results");
		}
	}, [isFetchingQuestion, router, question?.allQuestionsAreAnswered]);

	return {
		question,
		questionError,
		isFetchingQuestion
	};
};

export const useQuestionAction = () => {
	const swrConfig = useSWRConfig();

	const {
		trigger: postVideoAnswer,
		error: postVideoAnswerError,
		isMutating: isPostingVideoAnswer
	} = useSWRMutation<null, IClientError, string, AnswerRoutePayload>("/api/answer", postVideoAnswerAction, {
		onSuccess: () => {
			swrConfig.mutate("/api/question");
		}
	});

	return {
		postVideoAnswer,
		postVideoAnswerError,
		isPostingVideoAnswer
	};
};
