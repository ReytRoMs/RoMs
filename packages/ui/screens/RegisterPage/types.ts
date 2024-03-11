export type SignUpFormData = { areYouACurrentRoMsMember?: "yes" | "no"; role?: string };

export interface UserSessionResponse {
	sessionUserId: string;
}
