"use client";

import {
	SelectContent,
	SelectDragIndicator,
	SelectDragIndicatorWrapper,
	SelectItem,
	SelectScrollView
} from "@gluestack-ui/themed";

export const DropdownMenu = ({
	options,
	value
}: {
	options: { label: string; value: string; disabled?: boolean; id: string }[];
	value: string;
}) => {
	return (
		<SelectContent>
			<SelectDragIndicatorWrapper bgColor='$textBody' rounded={"$full"} width={"$1/4"} height={4} marginBottom={5}>
				<SelectDragIndicator />
			</SelectDragIndicatorWrapper>
			<SelectScrollView backgroundColor='white'>
				{options?.map((option) => {
					return (
						<SelectItem
							label={option.label}
							value={option.value}
							disabled={option?.disabled ?? false}
							isDisabled={option?.disabled ?? false}
							key={option.id}
							backgroundColor={value === option.value ? "$textBody" : "white"}
						/>
					);
				})}
			</SelectScrollView>
		</SelectContent>
	);
};
