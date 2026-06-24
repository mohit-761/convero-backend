import * as z from 'zod';

export let changePasswordSchema = z.object({
    password: z
        .string({ error: 'password is required' })
        .min(8, { error: 'password must have atleast 8 characters' })
        .max(8, { error: 'password cannot have more than 8 characters' }),

    confirm_password: z
        .string({ error: 'confirm_password is required' })

}).refine((data) => data.password === data.confirm_password, {
    message: 'password and confirm password must be same',
    path: ['confirm_password']
});

export type resetPasswordSchemaType = z.infer<typeof changePasswordSchema>;

export let forgotPasswordSchema = z.object({

    email: z.email({ error: 'please enter a valid email' }),

    password: z
        .string({ error: 'password is required' })
        .min(8, { error: 'password must have atleast 8 characters' })
        .max(8, { error: 'password cannot have more than 8 characters' }),

    confirm_password: z
        .string({ error: 'confirm_password is required' }),

    otp: z.string({ error: 'otp is required' })
        .length(6, { error: 'please enter a valid otp' })
        .optional()

}).refine((data) => data.password === data.confirm_password, {
    message: 'password and confirm password must be same',
    path: ['confirm_password']
});

export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;