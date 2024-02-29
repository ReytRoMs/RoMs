import { NextResponse } from "next/server";
import { PrismaClient, UsersPrimaryRole } from "@prisma/client";
import { sendErrorResponse } from "../errorResponse";
import { ZodError, boolean, object, z } from "zod";

const prisma = new PrismaClient();

export type NewSessionUserRequest = {
	isCurrentRomsMember: boolean;
	usersPrimaryRole: UsersPrimaryRole;
};

const newUserSchema = object({
	isCurrentRomsMember: boolean({
		required_error: "RoMS membership status is required",
		invalid_type_error: "RoMS membership status should be a boolean"
	}),
	usersPrimaryRole: z.nativeEnum(UsersPrimaryRole, {
		errorMap: (issue) => {
			// @ts-expect-error - Zod gives us this issue.received but apparently doesn't know about it!
			if (issue.received === "undefined") {
				return { message: "User primary role is required" };
			}

			return { message: "Invalid user primary role" };
		}
	})
});

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const validatedUser = newUserSchema.parse(data);

		const isCurrentRomsMember = validatedUser?.isCurrentRomsMember;
		const usersPrimaryRole = validatedUser?.usersPrimaryRole;

		const createdUser = await prisma.sessionUser.create({
			data: {
				is_current_roms_member: isCurrentRomsMember,
				UsersPrimaryRole: usersPrimaryRole
			}
		});

		const { id, is_current_roms_member, UsersPrimaryRole } = createdUser;
		const formattedUser = {
			id: id,
			isCurrentRomsMember: is_current_roms_member,
			usersPrimaryRole: UsersPrimaryRole
		};

		return NextResponse.json(formattedUser);
	} catch (err) {
		const errorMessage = "Error creating user";
		const errorReasons = JSON.parse(err)?.map((err: ZodError) => err.message);

		return sendErrorResponse({ errorMessage, errorReasons, statusCode: errorReasons.length ? 403 : 500 });
	}
}
