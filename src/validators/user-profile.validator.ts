import * as z from 'zod';

export const userProfileValidator = z.object({
    name: z
        .string('name is required and cannot be empty')
        // .min(1, { message: 'name cannot be empty' })
        .trim()
        .min(3, { message: 'name must have atleast 3 characters' })
        .max(50, { message: 'name cannot have more than 50 characters' })
        .optional(),

    email: z
        .email({ error: 'please provide a valid email' })
        .optional(),

    otp: z.string()
        .length(6, { error: 'please enter a valid otp' })
        .optional()

});

export type userProfileValidatorType = z.infer<typeof userProfileValidator>;