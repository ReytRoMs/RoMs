import { UsersPrimaryRole } from "database";
import { capitalizeFirstLetter } from "./strings";

export const mapRoleToFriendlyDisplayLabel = (role: UsersPrimaryRole | null) => {
	if (role === UsersPrimaryRole.CONSULTANT_OR_NUTRITIONIST) {
		return "Consultant/nutritionist";
	}

	return capitalizeFirstLetter(role?.toLocaleLowerCase()?.split("_")?.join(" ") ?? "") ?? "";
};
