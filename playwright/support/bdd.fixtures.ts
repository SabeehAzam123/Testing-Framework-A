import { test as base, createBdd } from 'playwright-bdd';
import { expect, request } from '@playwright/test';
import { BaseClient } from '@core/http/baseClient';

type MyFixtures = {
  client: BaseClient;
};

export const test = base.extend<MyFixtures>({
  client: async ({}, use) => {
    const baseURL =
      process.env.API_BASE_URL ||
      process.env.UI_BASE_URL ||
      'http://localhost:3000';

    const apiContext = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        Accept: 'application/json',
      },
    });

    const client = new BaseClient(apiContext);
    await use(client);
    await apiContext.dispose();
  },
});

export { expect };

export const { Given, When, Then, Before, After } = createBdd(test);