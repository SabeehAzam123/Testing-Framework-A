import { test, expect } from '@support/fixtures';
import { SessionApi } from '@services/api/session.api';
import { UsersApi } from '@services/api/users.api';
import { UsersAssertions } from '@api-kit/assertions/users.assertions';

test('@regression @api staff is read-only on users', async ({ client }) => {
  const token = await SessionApi.staffToken(client);
  expect(token).toBeTruthy();

  // Staff can list
  const listRes = await UsersApi.list(client, '/api/users', token);
  const listData = await UsersAssertions.expectList(listRes);
  expect(listData?.data?.length).toBeGreaterThan(0);

  // Pick any existing user id from list (id or _id)
  const first: any = listData?.data?.[0];
  const id = String(first?.id ?? first?._id ?? '');
  expect(id).toBeTruthy();

  // Staff cannot create
  const createRes = await UsersApi.create(
    client,
    { email: `rbac.staff.${Date.now()}@test.com`, password: 'Secret12', role: 'Staff' },
    token
  );
  expect(createRes.status()).toBe(403);

  // Staff cannot update
  const updateRes = await UsersApi.update(
    client,
    id,
    { email: `rbac.staff.updated.${Date.now()}@test.com`, role: 'Staff' },
    token
  );
  expect(updateRes.status()).toBe(403);

  // Staff cannot delete
  const deleteRes = await UsersApi.remove(client, id, token);
  expect(deleteRes.status()).toBe(403);
});