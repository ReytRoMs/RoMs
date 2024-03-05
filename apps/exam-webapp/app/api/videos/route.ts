import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
	const videos = await get("videos");
	return NextResponse.json(videos);
}
