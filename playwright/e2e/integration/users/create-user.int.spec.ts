import { test, expect } from '@support/fixtures';
import { SessionApi } from '@services/api/session.api';
import { UsersApi } from '@services/api/users.api';
import { UsersRequests } from '@api-kit/requests/users.requests';
import { UsersAssertions } from '@api-kit/assertions/users.assertions';

import { LoginFlow } from '@ui/flows/login.flow';
import { UsersFlow } from '@ui/flows/users.flow';

test('@regression @int create user via API then verify in UI', async ({ page, client }) => {
  const token = await SessionApi.adminToken(client);
  expect(token).toBeTruthy();

  const unique = Date.now();
  const email = `int.user.${unique}@test.com`;

  const createRes = await UsersApi.create(
    client,
    UsersRequests.create({ email, password: 'Secret12', role: 'Staff' }),
    token
  );
  await UsersAssertions.expectCreated(createRes);

  const loginFlow = new LoginFlow(page);
  await loginFlow.loginAs('admin@test.com', 'Admin123!');

  const usersFlow = new UsersFlow(page);
  await usersFlow.openUsers();
  await usersFlow.searchByEmail(email);
  await usersFlow.expectUserVisible(email);
});