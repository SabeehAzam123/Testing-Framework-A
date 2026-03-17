import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { UsersPage } from '../pages/users/users.page';

export class DeleteUserFlow {
  constructor(private readonly page: Page) {}

  async openUsers() {
    const users = new UsersPage(this.page);
    await users.act.goto();
    await users.expectLoaded();
    await users.waitForLoadToFinish();
  }

  async deleteUserBySearch(emailToDelete: string) {
    const users = new UsersPage(this.page);

    // Search for user
    await users.act.search(emailToDelete);
    await users.waitForLoadToFinish();
    await expect(this.page.getByTestId('users-table')).toContainText(emailToDelete);

    // Extract row id
    const row = this.page.locator(`[data-testid^="user-row-"]`).filter({ hasText: emailToDelete }).first();
    await expect(row).toBeVisible({ timeout: 10_000 });

    const testId = await row.getAttribute('data-testid');
    const id = testId?.replace('user-row-', '') ?? '';
    expect(id, 'Could not extract user id from row testid').toBeTruthy();

    // Open delete modal
    await users.act.clickDeleteForRowId(id);
    await expect(users.loc.deleteModal).toBeVisible();
    await expect(users.loc.deleteConfirmText).toContainText(emailToDelete);

    // Confirm delete
    await users.act.confirmDelete();

    // Modal closes
    await expect(users.loc.deleteModal).toBeHidden({ timeout: 10_000 });

    // Verify no results after searching again
    await users.act.search(emailToDelete);
    await users.waitForLoadToFinish();
    await expect(users.loc.empty).toBeVisible({ timeout: 10_000 });
  }
}