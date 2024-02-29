import { NextResponse } from "next/server";
import { PrismaClient, UsersPrimaryRole } from "@prisma/client";
import { sendErrorResponse } from "../errorResponse";
import { handleNewUserErrors } from "./errorHandler";

const prisma = new PrismaClient();

export async function GET() {
	try {
		const user = await prisma.sessionUser.findFirst({
			where: {
				UsersPrimaryRole: UsersPrimaryRole.FARMER
			}
		});
		return NextResponse.json(user);
	} catch (err) {
		const errorMessage = `Error getting user`;
		return sendErrorResponse({ errorMessage, statusCode: 500 });
	}
}

export type NewSessionUserRequest = {
	isCurrentRomsMember: boolean;
	usersPrimaryRole: UsersPrimaryRole;
};

export async function POST(request: Request) {
	try {
		const user = (await request.json()) as NewSessionUserRequest;
		const errors = await handleNewUserErrors(user);
		if (errors) {
			return sendErrorResponse(errors);
		}

		const isCurrentRomsMember = user?.isCurrentRomsMember;
		const usersPrimaryRole = user?.usersPrimaryRole;

		const newUser = await prisma.sessionUser.create({
			data: {
				is_current_roms_member: isCurrentRomsMember,
				UsersPrimaryRole: usersPrimaryRole
			}
		});

		return NextResponse.json(newUser);
	} catch (err) {
		const errorMessage = `Error creating user`;
		return sendErrorResponse({ errorMessage, statusCode: 500 });
	}
}
