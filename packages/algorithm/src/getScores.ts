type ClassificationsRecordedCounts = {
	truePositiveCount: number;
	trueNegativeCount: number;
	falsePositiveCount: number;
	falseNegativeCount: number;
};

const getRoundedScore = (score: number) => {
	const DECIMAL_PLACES = 2;

	return Number(score.toFixed(DECIMAL_PLACES));
};

export const getAccuracyScore = ({
	truePositiveCount,
	trueNegativeCount,
	falsePositiveCount,
	falseNegativeCount
}: ClassificationsRecordedCounts) => {
	const [TP, TN, FP, FN] = [truePositiveCount, trueNegativeCount, falsePositiveCount, falseNegativeCount];

	const accuracyScore = (TP + TN) / (TP + TN + FP + FN);

	const roundedAccuracyScore = getRoundedScore(accuracyScore);

	return roundedAccuracyScore;
};

export const getSensitivityScore = ({ truePositiveCount, falseNegativeCount }: ClassificationsRecordedCounts) => {
	const [TP, FN] = [truePositiveCount, falseNegativeCount];

	const sensitivityScore = TP / (TP + FN);

	const roundedSensitivityScore = getRoundedScore(sensitivityScore);

	return roundedSensitivityScore;
};

export const getSpecificityScore = ({ trueNegativeCount, falsePositiveCount }: ClassificationsRecordedCounts) => {
	const [TN, FP] = [trueNegativeCount, falsePositiveCount];

	const sensitivityScore = TN / (FP + TN);

	const roundedSensitivityScore = getRoundedScore(sensitivityScore);

	return roundedSensitivityScore;
};
