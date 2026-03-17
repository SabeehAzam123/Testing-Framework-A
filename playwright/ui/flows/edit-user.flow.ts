import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { UsersPage } from '../pages/users/users.page';

export class EditUserFlow {
  constructor(private readonly page: Page) {}

  async openUsers() {
    const users = new UsersPage(this.page);
    await users.act.goto();
    await users.expectLoaded();
    await users.waitForLoadToFinish();
  }

  async editUserBySearch(emailToFind: string, update: { newEmail: string; role: 'Admin' | 'Staff' }) {
    const users = new UsersPage(this.page);

    // Search for the user (table must contain it)
    await users.act.search(emailToFind);
    await users.waitForLoadToFinish();
    await expect(this.page.getByTestId('users-table')).toContainText(emailToFind);

    // Find the row id by reading the first matching row's data-testid (user-row-<id>)
    const row = this.page.locator(`[data-testid^="user-row-"]`).filter({ hasText: emailToFind }).first();
    await expect(row).toBeVisible({ timeout: 10_000 });

    const testId = await row.getAttribute('data-testid');
    const id = testId?.replace('user-row-', '') ?? '';
    expect(id, 'Could not extract user id from row testid').toBeTruthy();

    // Open edit modal
    await users.act.clickEditForRowId(id);
    await expect(users.loc.editModal).toBeVisible();

    // Apply edit and save
    await users.act.fillEditForm({ email: update.newEmail, role: update.role });
    await users.act.submitEdit();

    // Modal closes
    await expect(users.loc.editModal).toBeHidden({ timeout: 10_000 });

    // Verify updated email is visible after search
    await users.act.search(update.newEmail);
    await users.waitForLoadToFinish();
    await expect(this.page.getByTestId('users-table')).toContainText(update.newEmail, { timeout: 10_000 });
  }
}