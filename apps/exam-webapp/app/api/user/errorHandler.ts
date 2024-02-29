import { UsersPrimaryRole } from "@prisma/client";
import { NewSessionUserRequest } from "./route";

export const handleNewUserErrors = async (user: NewSessionUserRequest) => {
	const isCurrentRomsMember = user?.isCurrentRomsMember;
	console.log("isCurrentRomsMember", isCurrentRomsMember);

	if (isCurrentRomsMember === undefined || isCurrentRomsMember === null) {
		const errorMessage = "Error creating user - RoMS membership status is required";
		return { errorMessage, statusCode: 403 };
	}

	const usersPrimaryRole = user?.usersPrimaryRole;

	if (!usersPrimaryRole) {
		const errorMessage = "Error creating user - user's primary role is required";
		return { errorMessage, statusCode: 403 };
	}

	const requestHasValidRole = Object.values(UsersPrimaryRole).includes(usersPrimaryRole);
	console.log("requestHasValidRole", requestHasValidRole);
	if (!requestHasValidRole) {
		const errorMessage = "Error creating user - invalid user primary role";
		return { errorMessage, statusCode: 403 };
	}

	return null;
};
