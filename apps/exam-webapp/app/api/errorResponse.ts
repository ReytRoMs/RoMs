import { NextResponse } from "next/server";

type ErrorData = {
	errorMessage: string;
	errorReasons?: string[];
	statusCode: number;
};

export const sendErrorResponse = ({ errorMessage, errorReasons, statusCode }: ErrorData) => {
	console.error({ errorMessage, errorReasons, statusCode });
	return NextResponse.json({ message: errorMessage, reasons: errorReasons }, { status: statusCode });
};
