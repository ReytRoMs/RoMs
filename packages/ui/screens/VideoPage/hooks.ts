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
	const swrConfig = useSWRConfig();

	const {
		data: question,
		error: questionError,
		isLoading: isFetchingQuestion,
		isValidating: isValidatingQuestion
	} = useSWR<IQuestion, IClientError>("/api/question", getQuestionLoader, {
		revalidateOnMount: true,
		revalidateOnFocus: true,
		revalidateOnReconnect: true
	});

	// When there is no videos left redirect the user to the results page
	useEffect(() => {
		if (
			isValidatingQuestion === false &&
			isFetchingQuestion === false &&
			(question?.allQuestionsAreAnswered ?? false) === true
		) {
			// Before redirecting delete any data currently assigned to /api/question cache entry (Doesn't seem to update even if a new response is found, to get a round it for now delete the data manually ugh)
			swrConfig.cache.delete("/api/question");

			// Redirect the user to the results page
			router.replace("/video/results");
		}
	}, [isFetchingQuestion, router, question, isValidatingQuestion, swrConfig]);

	return {
		question,
		questionError,
		isFetchingQuestion,
		isValidatingQuestion
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
