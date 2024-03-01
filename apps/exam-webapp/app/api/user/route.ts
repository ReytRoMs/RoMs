import { NextResponse } from "next/server";
import { PrismaClient, UsersPrimaryRole } from "@prisma/client";
import { get } from "@vercel/edge-config";
import { sendErrorResponse } from "../errorResponse";
import { boolean, object, z } from "zod";

const prisma = new PrismaClient();

export type NewSessionUserRequest = {
	isCurrentRomsMember: boolean;
	usersPrimaryRole: UsersPrimaryRole;
};

type Video = {
	youtube_id: string;
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
	const ERROR_MESSAGE = "Error creating user";

	try {
		const data = await request.json();
		const validationResult = newUserSchema.safeParse(data);

		if (!validationResult.success) {
			const errorReasons = validationResult.error.issues.map((err) => err.message);

			return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 403 });
		}

		const { data: validatedUser } = validationResult;

		const isCurrentRomsMember = validatedUser?.isCurrentRomsMember;
		const usersPrimaryRole = validatedUser?.usersPrimaryRole;

		const videoData = await get<Video[]>("videos");

		if (!videoData?.length) {
			const errorReasons = ["Error fetching video data"];
			return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 503 });
		}

		const numberOfVideosToTake = 20;
		const randomVideos = videoData
			.map((video) => ({ youtube_id: video.youtube_id, randomSortOrder: Math.random() }))
			.sort((a, b) => a.randomSortOrder - b.randomSortOrder)
			.slice(0, numberOfVideosToTake)
			.map((video, index) => ({
				order: index,
				youtube_id: video.youtube_id
			}));

		const createdUser = await prisma.sessionUser.create({
			data: {
				is_current_roms_member: isCurrentRomsMember,
				UsersPrimaryRole: usersPrimaryRole,
				Questions: {
					createMany: {
						data: randomVideos
					}
				}
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
		const errorReasons = [err.message];

		return sendErrorResponse({ errorMessage: ERROR_MESSAGE, errorReasons, statusCode: 500 });
	}
}
