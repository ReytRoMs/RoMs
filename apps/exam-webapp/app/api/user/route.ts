import { NextResponse } from "next/server";
import { PrismaClient, UsersPrimaryRole } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	const user = await prisma.sessionUser.findFirst({
		where: {
			UsersPrimaryRole: UsersPrimaryRole.FARMER
		}
	});
	return NextResponse.json(user);
}
