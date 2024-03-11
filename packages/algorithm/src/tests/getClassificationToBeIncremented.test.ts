import { AnswerOption } from "database";
import { getClassificationToBeIncremented } from "..";
import { Classifications } from "../types";

describe("Get the correct classification (true_positive, true_negative, etc.) to be incremented", () => {
	describe("user answered GOOD", () => {
		test("should classify GOOD/GOOD correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.GOOD,
				correctAnswer: AnswerOption.GOOD
			});

			expect(classification).toBe(Classifications.true_negative);
		});

		test("should classify GOOD/IMPERFECT correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.GOOD,
				correctAnswer: AnswerOption.IMPERFECT
			});

			expect(classification).toBe(Classifications.true_negative);
		});

		test("should classify GOOD/IMPAIRED correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.GOOD,
				correctAnswer: AnswerOption.IMPAIRED
			});

			expect(classification).toBe(Classifications.false_negative);
		});

		test("should classify GOOD/SEVERELY_IMPAIRED correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.GOOD,
				correctAnswer: AnswerOption.SEVERELY_IMPAIRED
			});

			expect(classification).toBe(Classifications.false_negative);
		});
	});

	describe("user answered IMPERFECT", () => {
		test("should classify IMPERFECT/GOOD correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.IMPERFECT,
				correctAnswer: AnswerOption.GOOD
			});

			expect(classification).toBe(Classifications.true_negative);
		});

		test("should classify IMPERFECT/IMPERFECT correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.IMPERFECT,
				correctAnswer: AnswerOption.IMPERFECT
			});

			expect(classification).toBe(Classifications.true_negative);
		});

		test("should classify IMPERFECT/IMPAIRED correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.IMPERFECT,
				correctAnswer: AnswerOption.IMPAIRED
			});

			expect(classification).toBe(Classifications.false_negative);
		});

		test("should classify IMPERFECT/SEVERELY_IMPAIRED correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.IMPERFECT,
				correctAnswer: AnswerOption.SEVERELY_IMPAIRED
			});

			expect(classification).toBe(Classifications.false_negative);
		});
	});

	describe("user answered IMPAIRED", () => {
		test("should classify IMPAIRED/GOOD correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.IMPAIRED,
				correctAnswer: AnswerOption.GOOD
			});

			expect(classification).toBe(Classifications.false_positive);
		});

		test("should classify IMPAIRED/IMPERFECT correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.IMPAIRED,
				correctAnswer: AnswerOption.IMPERFECT
			});

			expect(classification).toBe(Classifications.false_positive);
		});

		test("should classify IMPAIRED/IMPAIRED correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.IMPAIRED,
				correctAnswer: AnswerOption.IMPAIRED
			});

			expect(classification).toBe(Classifications.true_positive);
		});

		test("should classify IMPAIRED/SEVERELY_IMPAIRED correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.IMPAIRED,
				correctAnswer: AnswerOption.SEVERELY_IMPAIRED
			});

			expect(classification).toBe(Classifications.true_positive);
		});
	});

	describe("user answered SEVERELY_IMPAIRED", () => {
		test("should classify SEVERELY_IMPAIRED/GOOD correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.SEVERELY_IMPAIRED,
				correctAnswer: AnswerOption.GOOD
			});

			expect(classification).toBe(Classifications.false_positive);
		});

		test("should classify SEVERELY_IMPAIRED/IMPERFECT correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.SEVERELY_IMPAIRED,
				correctAnswer: AnswerOption.IMPERFECT
			});

			expect(classification).toBe(Classifications.false_positive);
		});

		test("should classify SEVERELY_IMPAIRED/IMPAIRED correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.SEVERELY_IMPAIRED,
				correctAnswer: AnswerOption.IMPAIRED
			});

			expect(classification).toBe(Classifications.true_positive);
		});

		test("should classify SEVERELY_IMPAIRED/SEVERELY_IMPAIRED correctly", () => {
			const classification = getClassificationToBeIncremented({
				usersAnswer: AnswerOption.SEVERELY_IMPAIRED,
				correctAnswer: AnswerOption.SEVERELY_IMPAIRED
			});

			expect(classification).toBe(Classifications.true_positive);
		});
	});
});
