import type { Page } from '@playwright/test';
import { LoginPage } from '../pages/login/login.page';
import { expect } from '@playwright/test';

export class LoginFlow {
    constructor(private readonly page: Page) {}

    async loginAs(email: string, password: string) {
        const login = new LoginPage(this.page);

        await login.act.goto();
        await login.expectLoaded();

        await login.act.login(email, password);

        // Successful login navigates to /dashboard in your app
        await this.page.waitForURL('**/dashboard', { timeout: 10_000 });
        await expect(this.page.getByTestId('dashboard-title')).toBeVisible();
    }
}
