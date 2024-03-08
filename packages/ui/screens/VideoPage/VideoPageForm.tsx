import { Form } from "formik";
import { RadioButtons } from "../../components";
import { AnswerOption } from "database";
import { IErrorResponse } from "../shared/types";
import { MustContain } from "../../components/Inputs/shared";
import { View } from "@gluestack-ui/themed";
import { IInputOption } from "@repo/types";

interface IVideoPageForm {
	onSubmit: () => void;
	isSubmitting: boolean;
	reasons: IErrorResponse["reasons"];
}

const answerOptions: IInputOption[] = [
	{ label: "0. Good mobility ", value: AnswerOption.GOOD, isDisabled: false },
	{ label: "1. Imperfect mobility ", value: AnswerOption.IMPERFECT, isDisabled: false },
	{ label: "2. Impaired mobility ", value: AnswerOption.IMPAIRED, isDisabled: false },
	{ label: "3. Severely impaired mobility", value: AnswerOption.SEVERELY_IMPAIRED, isDisabled: false }
];

export const VideoPageForm = ({ onSubmit, isSubmitting, reasons }: IVideoPageForm) => {
	return (
		<Form style={{ marginBottom: "auto" }}>
			<RadioButtons
				options={answerOptions}
				name='answer'
				onChange={() => {
					onSubmit();
				}}
				isDisabled={isSubmitting}
			/>

			{(reasons?.length ?? 0) > 0 && (
				<View marginBottom={"$5"} alignItems='center'>
					{reasons?.map((error) => <MustContain message={error} key={error} />) ?? null}
				</View>
			)}
		</Form>
	);
};
