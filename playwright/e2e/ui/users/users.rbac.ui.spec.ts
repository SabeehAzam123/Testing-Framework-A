import { test, expect } from '@support/fixtures';
import { UsersPage } from '@ui/pages/users/users.page';

test('@regression @ui staff has read-only access on Users page', async ({ page }) => {
  const users = new UsersPage(page);

  await users.act.goto();
  await page.waitForURL('**/users', { timeout: 10_000 });

  await users.expectLoaded();
  await users.waitForLoadToFinish();

  // Create button disabled + hint visible
  await expect(users.loc.createUserBtn).toBeDisabled();
  await expect(users.loc.rbacHint).toBeVisible();

  // Ensure at least one row exists
  const firstRow = page.locator(`[data-testid^="user-row-"]`).first();
  await expect(firstRow).toBeVisible({ timeout: 10_000 });

  const testId = await firstRow.getAttribute('data-testid');
  const id = testId?.replace('user-row-', '') ?? '';
  expect(id).toBeTruthy();

  // Edit/Delete disabled for staff
  await expect(users.loc.editBtnById(id)).toBeDisabled();
  await expect(users.loc.deleteBtnById(id)).toBeDisabled();
});