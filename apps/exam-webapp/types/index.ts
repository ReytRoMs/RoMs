import { UsersPrimaryRole } from "@prisma/client";

export type NewSessionUserRequest = {
	isCurrentRomsMember: boolean;
	usersPrimaryRole: UsersPrimaryRole;
};

export type VideoData = {
	youtube_id: string;
	correct_answer?: string;
};
