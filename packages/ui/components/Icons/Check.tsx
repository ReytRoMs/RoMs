"use client";

import { Icon, createIcon } from "@gluestack-ui/themed";

import { Path } from "react-native-svg";
import { IconProps } from "./types";

const CheckIcon = createIcon({
	viewBox: "0 0 24 24",
	path: (
		<Path
			d='M9.74997 18C9.55119 17.9973 9.36059 17.9204 9.2156 17.7844L3.9656 12.5344C3.846 12.3887 3.78488 12.2037 3.79413 12.0154C3.80338 11.8271 3.88233 11.649 4.01563 11.5157C4.14893 11.3824 4.32705 11.3034 4.51534 11.2942C4.70363 11.2849 4.88862 11.346 5.03435 11.4656L9.74997 16.1906L19.7156 6.21563C19.8613 6.09603 20.0463 6.03491 20.2346 6.04416C20.4229 6.0534 20.601 6.13236 20.7343 6.26566C20.8676 6.39896 20.9466 6.57708 20.9558 6.76537C20.9651 6.95366 20.9039 7.13865 20.7843 7.28437L10.2843 17.7844C10.1394 17.9204 9.94876 17.9973 9.74997 18Z'
			fill='currentColor'
		/>
	)
});

export const Check = ({ colour = "$white" }: IconProps) => {
	return <Icon as={CheckIcon} color={colour} fill='none' width={24} height={24} />;
};
