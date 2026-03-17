// playwright/ui/pages/users/users.page.ts

import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { UsersLocators } from './users.locators';
import { UsersActions } from './users.actions';
import { waitForLoaderToDisappear } from '@core/helpers/waiters';
import { expectVisible, expectHidden } from '@core/assertions/uiAssertions';

export class UsersPage {
  readonly page: Page;

  // Keep BOTH naming styles so old and new code both work
  readonly loc: UsersLocators;
  readonly locators: UsersLocators;

  readonly act: UsersActions;
  readonly actions: UsersActions;

  constructor(page: Page) {
    this.page = page;

    this.loc = new UsersLocators(page);
    this.locators = this.loc;

    // Your current UsersActions expects only page
    this.act = new UsersActions(page);
    this.actions = this.act;
  }

  async goto(): Promise<void> {
    await this.act.goto();
  }

  async expectLoaded(): Promise<void> {
    await expectVisible(this.loc.title);
    await this.waitForLoadToFinish();
  }

  async waitForLoadToFinish(): Promise<void> {
    await waitForLoaderToDisappear(this.loc.loading);
  }

  async expectEmptyState(): Promise<void> {
    await expectVisible(this.loc.empty);
  }

  async expectCreateModalOpen(): Promise<void> {
    await expectVisible(this.loc.createModal);
  }

  async expectCreateModalClosed(): Promise<void> {
    await expectHidden(this.loc.createModal);
  }

  async expectEditModalOpen(): Promise<void> {
    await expectVisible(this.loc.editModal);
  }

  async expectEditModalClosed(): Promise<void> {
    await expectHidden(this.loc.editModal);
  }

  async expectDeleteModalOpen(): Promise<void> {
    await expectVisible(this.loc.deleteModal);
  }

  async expectDeleteModalClosed(): Promise<void> {
    await expectHidden(this.loc.deleteModal);
  }

  async expectUserVisible(email: string): Promise<void> {
    await expect(this.loc.table).toContainText(email, { timeout: 10_000 });
  }

  async expectUserNotVisible(email: string): Promise<void> {
    await expect(this.loc.table).not.toContainText(email);
  }
}