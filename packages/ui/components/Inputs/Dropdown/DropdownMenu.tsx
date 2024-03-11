"use client";

import {
	SelectContent,
	SelectDragIndicator,
	SelectDragIndicatorWrapper,
	SelectItem,
	SelectScrollView
} from "@gluestack-ui/themed";
import { IInputOption } from "@repo/types";

export const DropdownMenu = ({ options, value }: { options: IInputOption[]; value: string }) => {
	return (
		<SelectContent>
			<SelectDragIndicatorWrapper bgColor='$textBody' rounded={"$full"} width={"$1/4"} height={4} marginBottom={5}>
				<SelectDragIndicator />
			</SelectDragIndicatorWrapper>
			<SelectScrollView backgroundColor='$white'>
				{options?.map((option) => {
					return (
						<SelectItem
							label={option.label}
							value={option.value}
							isDisabled={option?.isDisabled ?? false}
							key={option.label}
							backgroundColor={value === option.value ? "$textBody" : "$white"}
						/>
					);
				})}
			</SelectScrollView>
		</SelectContent>
	);
};
