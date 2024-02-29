import { NextResponse } from "next/server";

export const sendErrorResponse = ({ errorMessage, statusCode }: { errorMessage: string; statusCode: number }) => {
	console.error(errorMessage);
	return NextResponse.json({ error: errorMessage }, { status: statusCode });
};
