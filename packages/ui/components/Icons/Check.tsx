"use client";

import { Icon, createIcon } from "@gluestack-ui/themed";

import { Path, Rect } from "react-native-svg";
import { IconProps } from "./types";

const CheckIcon = createIcon({
	viewBox: "0 0 32 32",
	path: (
		<>
			<Rect width='32' height='32' rx='16' fill='currentColor' />
			<Path
				d='M25.5306 11.2806L13.5306 23.2806C13.4609 23.3504 13.3782 23.4057 13.2871 23.4434C13.1961 23.4812 13.0985 23.5006 12.9999 23.5006C12.9014 23.5006 12.8038 23.4812 12.7127 23.4434C12.6217 23.4057 12.539 23.3504 12.4693 23.2806L7.2193 18.0306C7.07857 17.8899 6.99951 17.699 6.99951 17.5C6.99951 17.301 7.07857 17.1101 7.2193 16.9694C7.36003 16.8286 7.55091 16.7496 7.74993 16.7496C7.94895 16.7496 8.13982 16.8286 8.28055 16.9694L12.9999 21.6897L24.4693 10.2194C24.61 10.0786 24.8009 9.99959 24.9999 9.99959C25.199 9.99959 25.3898 10.0786 25.5306 10.2194C25.6713 10.3601 25.7503 10.551 25.7503 10.75C25.7503 10.949 25.6713 11.1399 25.5306 11.2806Z'
				fill='white'
			/>
		</>
	)
});

export const Check = ({ colour = "$white" }: IconProps) => {
	return <Icon as={CheckIcon} color={colour} fill='none' width={32} height={32} />;
};
