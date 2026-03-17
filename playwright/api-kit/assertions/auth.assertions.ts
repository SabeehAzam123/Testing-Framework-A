import { expect, type APIResponse } from '@playwright/test';
import { z } from 'zod';

const LoginResponseSchema = z.object({
    data: z.object({
        token: z.string().min(1),
        user: z.object({
            id: z.string().min(1),
            email: z.string().email(),
            role: z.enum(['Admin', 'Staff'])
        })
    })
});

export const AuthAssertions = {
    async expectLoginAndGetToken(res: APIResponse) {
        expect(res.status()).toBe(200);
        const json = await res.json();
        const parsed = LoginResponseSchema.safeParse(json);
        expect(parsed.success, 'Login response schema mismatch').toBe(true);
        return parsed.success ? parsed.data.data.token : '';
    }
};
