import * as z from 'zod';

export let filterParamsSchema = z.object({
    page: z.
        number({ error: 'page is required' })
        .min(1, { error: 'please enter a valid page number' })
        .optional(),

    limit: z.
        number({ error: 'limit is required' })
        .min(1, { error: 'please enter a valid limit' })
        .optional(),

    search: z
            .string({ error: 'search params is required'})
            .optional()

});

export type filterParamsSchemaType = z.infer<typeof filterParamsSchema>;