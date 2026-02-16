import { test as base, request, type APIRequestContext } from '@playwright/test';
import { BaseClient } from '../core/http/baseClient';
import { logger } from '../core/logging/logger';
import { env } from '../config/env';

type Fixtures = {
    api: APIRequestContext;
    client: BaseClient;
};

export const test = base.extend<Fixtures>({
    api: async ({}, use) => {
        const apiContext = await request.newContext({
            baseURL: env.API_BASE_URL
        });
        await use(apiContext);
        await apiContext.dispose();
    },

    client: async ({ api }, use) => {
        const client = new BaseClient(api, logger);
        await use(client);
    }
});

export { expect } from '@playwright/test';
