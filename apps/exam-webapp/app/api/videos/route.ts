import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export async function GET() {
	const videos = await get("videos");
	return NextResponse.json(videos);
}
