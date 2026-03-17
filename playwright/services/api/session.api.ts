// playwright/services/api/session.api.ts

import type { BaseClient } from '@core/http/baseClient';
import { AuthApi } from './auth.api';
import { expectOkJson } from '@core/assertions/apiAssertions';

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

export class SessionApi {
  static async adminSession(client: BaseClient): Promise<LoginResponse> {
    const email = process.env.E2E_ADMIN_EMAIL;
    const password = process.env.E2E_ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error('Missing admin credentials in environment variables.');
    }

    const response = await AuthApi.login(client, { email, password });
    return await expectOkJson<LoginResponse>(response, 200);
  }

  static async staffSession(client: BaseClient): Promise<LoginResponse> {
    const email = process.env.E2E_STAFF_EMAIL;
    const password = process.env.E2E_STAFF_PASSWORD;

    if (!email || !password) {
      throw new Error('Missing staff credentials in environment variables.');
    }

    const response = await AuthApi.login(client, { email, password });
    return await expectOkJson<LoginResponse>(response, 200);
  }

  static async adminToken(client: BaseClient): Promise<string> {
    const session = await this.adminSession(client);
    return session.token;
  }

  static async staffToken(client: BaseClient): Promise<string> {
    const session = await this.staffSession(client);
    return session.token;
  }
}