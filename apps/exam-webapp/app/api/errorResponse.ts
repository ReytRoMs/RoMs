import { IErrorResponse } from "@repo/types";
import { NextResponse } from "next/server";

export const sendErrorResponse = ({ errorMessage, errorReasons, statusCode }: IErrorResponse) => {
	console.error({ message: errorMessage, reasons: errorReasons, status: statusCode });
	return NextResponse.json({ message: errorMessage, reasons: errorReasons }, { status: statusCode });
};
