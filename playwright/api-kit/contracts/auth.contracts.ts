import { z } from 'zod';

export const LoginResponseSchema = z.object({
    data: z.object({
        token: z.string().min(1),
        user: z.object({
            id: z.string().min(1),
            email: z.string().email(),
            role: z.enum(['Admin', 'Staff'])
        })
    })
});
