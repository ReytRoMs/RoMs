import { NextResponse } from "next/server";
import prismaClient from "@/prismaClient";
import { UsersPrimaryRole } from "@prisma/client";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
	const user = await prismaClient.sessionUser.findFirst({
		where: {
			UsersPrimaryRole: UsersPrimaryRole.FARMER
		}
	});
	return NextResponse.json(user);
}
