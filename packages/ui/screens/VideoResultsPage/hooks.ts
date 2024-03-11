import useSWR from "swr";

import { IResultsTableData } from "@repo/types";
import { IClientError } from "../shared/types";
import { getVideoResultsLoader } from "./loader";

export const useQuestionResultsLoader = () => {
	const {
		data: questionResults,
		error: questionResultsError,
		isLoading: isFetchingQuestionResults
	} = useSWR<IResultsTableData, IClientError>("/api/results", getVideoResultsLoader, {
		keepPreviousData: true,
		revalidateOnFocus: false
	});

	return {
		questionResults,
		questionResultsError,
		isFetchingQuestionResults
	};
};
