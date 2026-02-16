import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
    UI_BASE_URL: z.string().url().default('http://localhost:3000'),
    API_BASE_URL: z.string().url().default('http://localhost:4000'),
    E2E_USERNAME: z.string().optional(),
    E2E_PASSWORD: z.string().optional(),
    LOG_LEVEL: z.string().default('info')
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
    // Show a readable error and fail fast
    // eslint-disable-next-line no-console
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables. Check your .env file.');
}

export const env = parsed.data;