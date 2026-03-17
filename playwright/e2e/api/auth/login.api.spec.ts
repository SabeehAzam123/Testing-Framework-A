import { test } from '../../../support/fixtures';
import { AuthRequests } from '../../../api-kit/requests/auth.requests';
import { AuthApi } from '../../../services/api/auth.api';
import { AuthAssertions } from '../../../api-kit/assertions/auth.assertions';

test('@smoke @api login works (admin seed)', async ({ client }) => {
  const payload = AuthRequests.login('admin@test.com', 'Admin123!');
  const res = await AuthApi.login(client, payload);
  await AuthAssertions.expectLoginAndGetToken(res);
});
