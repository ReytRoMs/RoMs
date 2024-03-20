/* eslint-disable @typescript-eslint/no-namespace */
import { z } from "zod";

// Define the variables for the project
const environmentVariablesSchema = z.object({
	DATABASE_URL: z.string({ required_error: "DATABASE_URL is a required variable" }),
	EDGE_CONFIG: z.string({ required_error: "EDGE_CONFIG is a required variable" }),
	SEND_GRID_API_KEY: z.string({ required_error: "SEND_GRID_API_KEY is a required variable" }),
	SEND_GRID_TO_EMAIL_ADDRESS: z.string({ required_error: "SEND_GRID_TO_EMAIL_ADDRESS is a required variable" }),
	SEND_GRID_FROM_EMAIL_ADDRESS: z.string({ required_error: "SEND_GRID_FROM_EMAIL_ADDRESS is a required variable" })
});

// Attempt to parse the schema, if validation fails throw an error as the project can't function without the variables
environmentVariablesSchema.parse(process.env);

// Inject the environment variables into the ProcessEnv interface, enables autocomplete which is SICK!!!!
declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof environmentVariablesSchema> {}
	}
}
