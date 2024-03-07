export enum Outcome {
	SOUND,
	LAME
}

// these map to the database column names where the scores are stored
export enum Classifications {
	true_negative = "true_negative",
	false_negative = "false_negative",
	false_positive = "false_positive",
	true_positive = "true_positive"
}
