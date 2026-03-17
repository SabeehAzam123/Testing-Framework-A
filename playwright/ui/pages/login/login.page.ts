import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { LoginLocators } from './login.locators';
import { LoginActions } from './login.actions';

export class LoginPage {
  readonly loc: LoginLocators;
  readonly act: LoginActions;

  constructor(private readonly page: Page) {
    this.loc = new LoginLocators(page);
    this.act = new LoginActions(page);
  }

  async goto(): Promise<void> {
    await this.act.goto();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.loc.title).toBeVisible();
    await expect(this.loc.submit).toBeVisible();
  }
}