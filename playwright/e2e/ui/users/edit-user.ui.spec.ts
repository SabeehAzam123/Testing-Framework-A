import { test } from '../../../support/fixtures';
import { CreateUserFlow } from '../../../ui/flows/create-user.flow';
import { EditUserFlow } from '../../../ui/flows/edit-user.flow';

test('@regression @ui admin can edit a user via UI', async ({ page }) => {
  const unique = Date.now();
  const email = `ui.edit.${unique}@test.com`;
  const updatedEmail = `ui.edit.updated.${unique}@test.com`;

  const create = new CreateUserFlow(page);
  await create.openUsers();
  await create.createUser({ email, password: 'Secret12', role: 'Staff' });

  const edit = new EditUserFlow(page);
  // we are already on users page; but openUsers is safe if you prefer
  await edit.editUserBySearch(email, { newEmail: updatedEmail, role: 'Admin' });
});