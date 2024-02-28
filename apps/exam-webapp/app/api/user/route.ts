import { NextResponse } from "next/server";
import prismaClient from "@/prismaClient";
import { UsersPrimaryRole } from "@prisma/client";

export async function GET() {
	const user = await prismaClient.sessionUser.findFirst({
		where: {
			UsersPrimaryRole: UsersPrimaryRole.FARMER
		}
	});
	return NextResponse.json(user);
}
