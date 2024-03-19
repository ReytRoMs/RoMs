export const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeEachLetter = (string: string[]) => {
	return string?.map((value) => capitalizeFirstLetter(value));
};
