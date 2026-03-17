import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  UI_BASE_URL: z.string().url().default('http://localhost:3000'),
  API_BASE_URL: z.string().url().default('http://localhost:3000'),

  // Legacy
  E2E_USERNAME: z.string().optional(),
  E2E_PASSWORD: z.string().optional(),

  // Preferred
  E2E_ADMIN_EMAIL: z.string().email().default('admin@test.com'),
  E2E_ADMIN_PASSWORD: z.string().min(1).default('Admin123!'),
  E2E_STAFF_EMAIL: z.string().email().default('staff@test.com'),
  E2E_STAFF_PASSWORD: z.string().min(1).default('Staff123!'),

  LOG_LEVEL: z.string().default('info')
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables. Check your .env file.');
}

export const env = parsed.data;