// playwright/support/global-setup.ts

import { chromium, request } from '@playwright/test';
import path from 'path';
import { createStorageStateFromSession } from '@core/auth/session';

type LoginResponse = {
  token: string;
  user: {
    id?: string;
    _id?: string;
    email?: string;
    role?: string;
    [key: string]: unknown;
  };
};

async function loginByApi(baseUrl: string, email: string, password: string): Promise<LoginResponse> {
  const api = await request.newContext({ baseURL: baseUrl });

  const response = await api.post('/api/auth/login', {
    data: { email, password },
  });

  if (response.status() !== 200) {
    throw new Error(`Login failed for ${email}. Status: ${response.status()}`);
  }

  const body = (await response.json()) as LoginResponse;
  await api.dispose();
  return body;
}

async function globalSetup(): Promise<void> {
  const baseUrl = process.env.UI_BASE_URL || 'http://localhost:3000';

  const adminEmail = process.env.E2E_ADMIN_EMAIL;
  const adminPassword = process.env.E2E_ADMIN_PASSWORD;
  const staffEmail = process.env.E2E_STAFF_EMAIL;
  const staffPassword = process.env.E2E_STAFF_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error('Missing admin credentials in env.');
  }

  if (!staffEmail || !staffPassword) {
    throw new Error('Missing staff credentials in env.');
  }

  const browser = await chromium.launch();

  const adminSession = await loginByApi(baseUrl, adminEmail, adminPassword);
  await createStorageStateFromSession({
    browser,
    baseUrl,
    verifyPath: '/dashboard',
    storageStatePath: path.resolve('playwright/support/storage/state.json'),
    session: {
      token: adminSession.token,
      user: adminSession.user,
    },
  });

  const staffSession = await loginByApi(baseUrl, staffEmail, staffPassword);
  await createStorageStateFromSession({
    browser,
    baseUrl,
    verifyPath: '/dashboard',
    storageStatePath: path.resolve('playwright/support/storage/state.staff.json'),
    session: {
      token: staffSession.token,
      user: staffSession.user,
    },
  });

  await browser.close();
}

export default globalSetup;