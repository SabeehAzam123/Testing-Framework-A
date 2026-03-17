import type { Page } from '@playwright/test';
import { LoginPage } from '../pages/login/login.page';
import { expect } from '@playwright/test';

export class LoginFlow {
  constructor(private readonly page: Page) {}

  async loginAs(email: string, password: string): Promise<void> {
    const login = new LoginPage(this.page);

    await login.goto();
    await login.expectLoaded();

    await login.act.login(email, password);

    // Successful login navigates to /dashboard in your app
    await this.page.waitForURL('**/dashboard', { timeout: 10_000 });
    await expect(this.page.getByTestId('dashboard-title')).toBeVisible();
  }

  async loginAsAdmin(): Promise<void> {
    const email = process.env.E2E_ADMIN_EMAIL;
    const password = process.env.E2E_ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error('Missing E2E_ADMIN_EMAIL or E2E_ADMIN_PASSWORD in environment variables.');
    }

    await this.loginAs(email, password);
  }

  async loginAsStaff(): Promise<void> {
    const email = process.env.E2E_STAFF_EMAIL;
    const password = process.env.E2E_STAFF_PASSWORD;

    if (!email || !password) {
      throw new Error('Missing E2E_STAFF_EMAIL or E2E_STAFF_PASSWORD in environment variables.');
    }

    await this.loginAs(email, password);
  }
}