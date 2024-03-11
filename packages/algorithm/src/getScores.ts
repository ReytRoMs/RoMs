export type ClassificationsRecordedCounts = {
	truePositiveCount: number;
	trueNegativeCount: number;
	falsePositiveCount: number;
	falseNegativeCount: number;
};

const getRoundedScore = (score: number) => {
	const DECIMAL_PLACES = 2;

	return Number(score.toFixed(DECIMAL_PLACES));
};

export const getScores = ({
	truePositiveCount,
	trueNegativeCount,
	falsePositiveCount,
	falseNegativeCount
}: ClassificationsRecordedCounts) => {
	// mapped values to variables and calculations specified by the client's R code
	const [TP, TN, FP, FN] = [truePositiveCount, trueNegativeCount, falsePositiveCount, falseNegativeCount];

	const accuracyScore = (TP + TN) / (TP + TN + FP + FN);
	const roundedAccuracyScore = getRoundedScore(accuracyScore);

	const sensitivityScore = TP / (TP + FN);
	const roundedSensitivityScore = getRoundedScore(sensitivityScore);

	const specificityScore = TN / (FP + TN);
	const roundedSpecificityScore = getRoundedScore(specificityScore);

	return {
		accuracy: roundedAccuracyScore,
		sensitivity: roundedSensitivityScore,
		specificity: roundedSpecificityScore
	};
};
