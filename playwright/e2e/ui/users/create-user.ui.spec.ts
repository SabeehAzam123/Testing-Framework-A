// playwright/e2e/ui/users/create-user.ui.spec.ts

import { test } from '@support/fixtures';
import { UsersPage } from '@ui/pages/users/users.page';

test('admin can create a user', async ({ page }) => {
  const usersPage = new UsersPage(page);

  await usersPage.goto();
  await usersPage.expectLoaded();

  await usersPage.act.openCreateModal();
  await usersPage.expectCreateModalOpen();

  await usersPage.act.fillCreateForm({
    email: 'testuser@example.com',
    password: 'Admin123!',
    role: 'Staff',
  });

  await usersPage.act.submitCreate();
  await usersPage.expectCreateModalClosed();

  await usersPage.act.search('testuser@example.com');
  await usersPage.waitForLoadToFinish();
  await usersPage.expectUserVisible('testuser@example.com');
});