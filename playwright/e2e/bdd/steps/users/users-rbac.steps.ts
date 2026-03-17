import { Given, When, Then, expect } from '@support/bdd.fixtures';
import { LoginFlow } from '@ui/flows/login.flow';
import { UsersPage } from '@ui/pages/users/users.page';

Given('I am logged in as a staff user through the UI', async ({ page }) => {
  // Clear admin storage state that may already be loaded by config
  await page.context().clearCookies();
  await page.goto('/');

  await page.evaluate(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  const loginFlow = new LoginFlow(page);
  await loginFlow.loginAsStaff();
});

When('I open the users page', async ({ page }) => {
  const usersPage = new UsersPage(page);
  await usersPage.goto();
  await usersPage.expectLoaded();
});

Then('the create user button should be disabled', async ({ page }) => {
  const usersPage = new UsersPage(page);
  await expect(usersPage.loc.createUserBtn).toBeDisabled();
});

Then('the RBAC hint should be visible', async ({ page }) => {
  const usersPage = new UsersPage(page);
  await expect(usersPage.loc.rbacHint).toBeVisible();
});

Then('the edit and delete actions should be disabled for the first user row', async ({ page }) => {
  const usersPage = new UsersPage(page);

  const row = page.locator('[data-testid^="user-row-"]').first();
  await expect(row).toBeVisible({ timeout: 10_000 });

  const testId = await row.getAttribute('data-testid');
  const id = testId?.replace('user-row-', '') ?? '';

  expect(id, 'Could not extract first user row id').toBeTruthy();

  await expect(usersPage.loc.editBtnById(id)).toBeDisabled();
  await expect(usersPage.loc.deleteBtnById(id)).toBeDisabled();
});