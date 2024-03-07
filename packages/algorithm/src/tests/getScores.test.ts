import { getAccuracyScore, getSensitivityScore, getSpecificityScore } from "..";

// test data here has been provided by Laura at RoMS (email 5 Mar 2024, 14:47)
describe("Get correct `accuracy`, `sensitivity` and `specificity` scores", () => {
	test("T1", () => {
		const scores = {
			falseNegativeCount: 6,
			falsePositiveCount: 21,
			trueNegativeCount: 82,
			truePositiveCount: 90
		};

		const accuracy = getAccuracyScore(scores);
		expect(accuracy).toBe(0.86);

		const sensitivity = getSensitivityScore(scores);
		expect(sensitivity).toBe(0.94);

		const specificity = getSpecificityScore(scores);
		expect(specificity).toBe(0.8);
	});

	test("T2", () => {
		const scores = {
			falseNegativeCount: 55,
			falsePositiveCount: 3,
			trueNegativeCount: 110,
			truePositiveCount: 44
		};

		const accuracy = getAccuracyScore(scores);
		expect(accuracy).toBe(0.73);

		const sensitivity = getSensitivityScore(scores);
		expect(sensitivity).toBe(0.44);

		const specificity = getSpecificityScore(scores);
		expect(specificity).toBe(0.97);
	});

	// T3 is missing from Laura's data

	test("T4", () => {
		const scores = {
			falseNegativeCount: 21,
			falsePositiveCount: 29,
			trueNegativeCount: 84,
			truePositiveCount: 78
		};

		const accuracy = getAccuracyScore(scores);
		expect(accuracy).toBe(0.76);

		const sensitivity = getSensitivityScore(scores);
		expect(sensitivity).toBe(0.79);

		const specificity = getSpecificityScore(scores);
		expect(specificity).toBe(0.74);
	});

	test("T5", () => {
		const scores = {
			falseNegativeCount: 14,
			falsePositiveCount: 17,
			trueNegativeCount: 96,
			truePositiveCount: 85
		};

		const accuracy = getAccuracyScore(scores);
		expect(accuracy).toBe(0.85);

		const sensitivity = getSensitivityScore(scores);
		expect(sensitivity).toBe(0.86);

		const specificity = getSpecificityScore(scores);
		expect(specificity).toBe(0.85);
	});

	test("T6", () => {
		const scores = {
			falseNegativeCount: 13,
			falsePositiveCount: 16,
			trueNegativeCount: 97,
			truePositiveCount: 86
		};

		const accuracy = getAccuracyScore(scores);
		expect(accuracy).toBe(0.86);

		const sensitivity = getSensitivityScore(scores);
		expect(sensitivity).toBe(0.87);

		const specificity = getSpecificityScore(scores);
		expect(specificity).toBe(0.86);
	});
});
