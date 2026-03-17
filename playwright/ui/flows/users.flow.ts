import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { UsersPage } from '../pages/users/users.page';

export class UsersFlow {
    constructor(private readonly page: Page) {}

    async openUsers() {
        const users = new UsersPage(this.page);
        await users.act.goto();
        await users.expectLoaded();
        await users.waitForLoadToFinish();
    }

    async searchByEmail(email: string) {
        const users = new UsersPage(this.page);
        await users.act.search(email);
        await users.waitForLoadToFinish();
    }

    async expectUserVisible(email: string) {
        await expect(this.page.getByTestId('users-table')).toContainText(email, { timeout: 10_000 });
    }
}
