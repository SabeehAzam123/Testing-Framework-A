import { test } from '@support/fixtures';
import { CreateUserFlow } from '@ui/flows/create-user.flow';
import { DeleteUserFlow } from '@ui/flows/delete-user.flow';

test('@regression @ui admin can delete a user via UI', async ({ page }) => {
  const unique = Date.now();
  const email = `ui.del.${unique}@test.com`;

  const create = new CreateUserFlow(page);
  await create.openUsers();
  await create.createUser({ email, password: 'Secret12', role: 'Staff' });

  const del = new DeleteUserFlow(page);
  await del.deleteUserBySearch(email);
});