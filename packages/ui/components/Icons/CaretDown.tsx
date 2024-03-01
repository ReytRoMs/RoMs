"use client";

import { Icon, createIcon } from "@gluestack-ui/themed";

import { Path } from "react-native-svg";
import { IconProps } from "./types";

const CaretDownIcon = createIcon({
	viewBox: "0 0 24 24",

	// Reads the "color" property provided to the component via GlueStacks
	path: (
		<>
			<Path
				d='M12 17.25C11.8012 17.2473 11.6106 17.1704 11.4656 17.0344L3.9656 9.53437C3.846 9.38865 3.78488 9.20366 3.79413 9.01537C3.80338 8.82708 3.88233 8.64896 4.01563 8.51566C4.14893 8.38236 4.32705 8.3034 4.51534 8.29416C4.70363 8.28491 4.88862 8.34603 5.03435 8.46563L12 15.4406L18.9656 8.46563C19.1113 8.34603 19.2963 8.28491 19.4846 8.29416C19.6729 8.3034 19.851 8.38236 19.9843 8.51566C20.1176 8.64896 20.1966 8.82708 20.2058 9.01537C20.2151 9.20366 20.1539 9.38865 20.0343 9.53437L12.5343 17.0344C12.3894 17.1704 12.1988 17.2473 12 17.25Z'
				fill='currentColor'
			/>
		</>
	)
});

export const CaretDown = ({ colour = "$backgroundBottom" }: IconProps) => {
	return <Icon as={CaretDownIcon} color={colour} fill='none' width={24} height={24} />;
};
