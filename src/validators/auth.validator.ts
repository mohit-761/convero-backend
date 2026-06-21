import * as z from 'zod';

export let registerSchema = z.object({
    name: z
        .string({ error: 'name is required' })
        .trim()
        .min(1, { message: 'name cannot be empty' })
        .min(3, { message: 'name must have atleast 3 characters' })
        .max(50, { message: 'name cannot have more than 50 characters' }),

    email: z.email({ error: 'please provide a valid email' }),

    password: z
        .string({ error: 'password is required' })
        .min(8, { error: 'password must have 8 characters' })
        .max(8, { error: 'password cannot have more than 8 characters' }),

    confirm_password: z
        .string({ error: 'confirm password is required' }),

    otp: z.string({ error: 'please enter otp' })
        .length(6, { error: 'please enter a valid otp' })
        .optional()

}).refine((data) => data.password === data.confirm_password, {
    message: 'password and confirm password must be same',
    path: ["confirm_password"]
});

export type registerSchemaType = z.infer<typeof registerSchema>;

export let loginSchema = z.object({

    email: z.email({ error: 'please enter a valid email' }),

    password: z.string({ error: 'password is required' })
        .min(8, { error: 'password must have 8 characters' })
        .max(8, { error: 'password cannot have more than 8 characters' })

})

export type loginSchemaType = z.infer<typeof loginSchema>;