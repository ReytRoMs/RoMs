import { mapAnswerToOutcome } from "..";

import { AnswerOption } from "database";
import { Outcome } from "../types";

describe("Map answers to outcomes correctly", () => {
	test("map AnswerOption.GOOD correctly", () => {
		const outcome = mapAnswerToOutcome(AnswerOption.GOOD);
		expect(outcome).toBe(Outcome.SOUND);
	});

	test("map AnswerOption.IMPERFECT correctly", () => {
		const outcome = mapAnswerToOutcome(AnswerOption.IMPERFECT);
		expect(outcome).toBe(Outcome.SOUND);
	});

	test("map AnswerOption.IMPAIRED correctly", () => {
		const outcome = mapAnswerToOutcome(AnswerOption.IMPAIRED);
		expect(outcome).toBe(Outcome.LAME);
	});

	test("map AnswerOption.SEVERELY_IMPAIRED correctly", () => {
		const outcome = mapAnswerToOutcome(AnswerOption.SEVERELY_IMPAIRED);
		expect(outcome).toBe(Outcome.LAME);
	});
});
