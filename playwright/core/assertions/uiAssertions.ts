// playwright/core/assertions/uiAssertions.ts

import { expect, Locator, Page } from '@playwright/test';

export async function expectVisible(locator: Locator): Promise<void> {
  await expect(locator).toBeVisible();
}

export async function expectHidden(locator: Locator): Promise<void> {
  await expect(locator).toBeHidden();
}

export async function expectEnabled(locator: Locator): Promise<void> {
  await expect(locator).toBeEnabled();
}

export async function expectDisabled(locator: Locator): Promise<void> {
  await expect(locator).toBeDisabled();
}

export async function expectText(locator: Locator, text: string | RegExp): Promise<void> {
  await expect(locator).toContainText(text);
}

export async function expectUrlContains(page: Page, value: string): Promise<void> {
  await expect(page).toHaveURL(new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}