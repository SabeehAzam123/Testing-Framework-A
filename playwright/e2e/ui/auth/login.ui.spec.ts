import { test } from '../../../support/fixtures';
import { LoginFlow } from '../../../ui/flows/login.flow';

test('@smoke @ui login works (admin)', async ({ page }) => {
  const flow = new LoginFlow(page);
  await flow.loginAs('admin@test.com', 'Admin123!');
});
