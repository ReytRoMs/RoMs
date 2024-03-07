import { getAccuracyScore } from "..";

describe("Get correct `accuracy` score", () => {
	test("T1", () => {
		const accuracy = getAccuracyScore({
			falseNegativeCount: 6,
			falsePositiveCount: 21,
			trueNegativeCount: 82,
			truePositiveCount: 90
		});

		expect(accuracy).toBe(0.86);
	});

	test("T2", () => {
		const accuracy = getAccuracyScore({
			falseNegativeCount: 55,
			falsePositiveCount: 3,
			trueNegativeCount: 110,
			truePositiveCount: 44
		});

		expect(accuracy).toBe(0.73);
	});

	test("T4", () => {
		const accuracy = getAccuracyScore({
			falseNegativeCount: 21,
			falsePositiveCount: 29,
			trueNegativeCount: 84,
			truePositiveCount: 78
		});

		expect(accuracy).toBe(0.76);
	});

	test("T5", () => {
		const accuracy = getAccuracyScore({
			falseNegativeCount: 14,
			falsePositiveCount: 17,
			trueNegativeCount: 96,
			truePositiveCount: 85
		});

		expect(accuracy).toBe(0.85);
	});

	test("T6", () => {
		const accuracy = getAccuracyScore({
			falseNegativeCount: 13,
			falsePositiveCount: 16,
			trueNegativeCount: 97,
			truePositiveCount: 86
		});

		expect(accuracy).toBe(0.86);
	});
});
