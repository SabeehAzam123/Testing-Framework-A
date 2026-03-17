// playwright/e2e/api/users/users.crud.api.spec.ts

import { test, expect } from '@support/fixtures';
import { SessionApi } from '@services/api/session.api';
import { UsersApi } from '@services/api/users.api';
import { UsersRequests } from '@api-kit/requests/users.requests';
import { UsersAssertions } from '@api-kit/assertions/users.assertions';
import { UserFactory } from '@data/factories/user.factory';

test('@regression @api users CRUD (admin)', async ({ client }) => {
  const token = await SessionApi.adminToken(client);
  expect(token).toBeTruthy();

  // LIST
  const listRes = await UsersApi.list(client, '/api/users', token);
  const listData = await UsersAssertions.expectList(listRes);
  expect(listData).toBeTruthy();

  // CREATE
  const createInput = UserFactory.staff();
  const createRes = await UsersApi.create(
    client,
    UsersRequests.create(createInput),
    token
  );
  await UsersAssertions.expectCreated(createRes);

  // Resolve id by email
  const realId = await UsersApi.resolveIdByEmail(client, createInput.email, token);
  expect(realId, 'Could not resolve created user id from list').toBeTruthy();

  // UPDATE
  const updateInput = UserFactory.update({
    email: UserFactory.staff().email,
    role: 'Admin',
  });

  const updateRes = await UsersApi.update(
    client,
    realId,
    UsersRequests.update(updateInput),
    token
  );
  await UsersAssertions.expectUpdated(updateRes);

  // DELETE
  const delRes = await UsersApi.remove(client, realId, token);
  await UsersAssertions.expectDeleted(delRes);
});