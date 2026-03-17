// playwright/core/helpers/waiters.ts

import type { Locator, Page } from '@playwright/test';

export async function waitForLoaderToDisappear(
  loader: Locator,
  timeout = 10_000
): Promise<void> {
  await loader.waitFor({ state: 'hidden', timeout }).catch(() => undefined);
}

export async function waitForUrlContains(
  page: Page,
  text: string,
  timeout = 10_000
): Promise<void> {
  await page.waitForURL(
    (url) => url.toString().includes(text),
    { timeout }
  );
}

export async function waitForText(
  locator: Locator,
  text: string,
  timeout = 10_000
): Promise<void> {
  await locator.filter({ hasText: text }).first().waitFor({
    state: 'visible',
    timeout,
  });
}