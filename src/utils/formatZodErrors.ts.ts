import * as z from 'zod';

export function formatZodErrors(error: z.ZodError): Record<string, string> {

    const errors: Record<string, string> = {};

    for (const issue of error.issues) {

        const field = issue.path.join(".");

        if (!errors[field]) {
            errors[field] = issue.message;
        }
    }

    return errors;

}