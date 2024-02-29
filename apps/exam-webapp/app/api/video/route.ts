import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

type Video = {
	youtube_id: string;
};

export async function GET() {
	const videos = (await get("videos")) as Video[];

	const nextVideo = videos?.[0];

	return NextResponse.json(nextVideo);
}
