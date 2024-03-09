import { IResultsTableData } from "@repo/types";
import { get } from "../../lib";

export const getVideoResultsLoader = async (url: string) => {
	const tableResults = get<IResultsTableData>({ url: url });
	return tableResults;
};
