import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { UsersPage } from '../pages/users/users.page';
import { ToastComponent } from '../components/toast.component';

export class CreateUserFlow {
    constructor(private readonly page: Page) {}

    async openUsers() {
        const users = new UsersPage(this.page);
        await users.act.goto();
        await users.expectLoaded();
        await users.waitForLoadToFinish();
    }

    async createUser(input: { email: string; password: string; role: 'Admin' | 'Staff' }) {
        const users = new UsersPage(this.page);
        const toast = new ToastComponent(this.page);

        await users.act.openCreateModal();
        await expect(users.loc.createModal).toBeVisible();

        await users.act.fillCreateForm(input);
        await users.act.submitCreate();

        // Expect success toast
//         await toast.expectMessage('User created');

        // Modal should close after success (it does in your code)
        await expect(users.loc.createModal).toBeHidden({ timeout: 10_000 });

        // Verify by searching
        await users.act.search(input.email);
        await users.waitForLoadToFinish();
        await expect(this.page.getByTestId('users-table')).toContainText(input.email, { timeout: 10_000 });
    }
}
