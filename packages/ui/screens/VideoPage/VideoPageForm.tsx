import { Form } from "formik";
import { RadioButtons } from "../../components";
import { AnswerOption } from "database";
import { IErrorResponse } from "../shared/types";
import { MustContain } from "../../components/Inputs/shared";
import { View } from "@gluestack-ui/themed";
import { IInputOption } from "@repo/types";
import { mapAnswerToFriendlyLabel } from "@repo/utilities";

interface IVideoPageForm {
	onSubmit: () => void;
	isSubmitting: boolean;
	reasons: IErrorResponse["reasons"];
}

const answerOptions: IInputOption[] = [
	{ label: mapAnswerToFriendlyLabel(AnswerOption.GOOD), value: AnswerOption.GOOD, isDisabled: false },
	{ label: mapAnswerToFriendlyLabel(AnswerOption.IMPERFECT), value: AnswerOption.IMPERFECT, isDisabled: false },
	{ label: mapAnswerToFriendlyLabel(AnswerOption.IMPAIRED), value: AnswerOption.IMPAIRED, isDisabled: false },
	{
		label: mapAnswerToFriendlyLabel(AnswerOption.SEVERELY_IMPAIRED),
		value: AnswerOption.SEVERELY_IMPAIRED,
		isDisabled: false
	}
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
				height={72}
			/>

			{(reasons?.length ?? 0) > 0 && (
				<View marginBottom={"$5"} alignItems='center'>
					{reasons?.map((error) => <MustContain message={error} key={error} />) ?? null}
				</View>
			)}
		</Form>
	);
};
