// playwright/core/auth/session.ts

import type { Browser, Page } from '@playwright/test';

export type SessionUser = {
  id?: string;
  _id?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
};

export type BrowserSessionData = {
  token: string;
  user: SessionUser;
};

export type InjectSessionOptions = {
  tokenStorageKey?: string;
  userStorageKey?: string;
};

const DEFAULT_OPTIONS: Required<InjectSessionOptions> = {
  tokenStorageKey: 'token',
  userStorageKey: 'user',
};

export async function injectSessionIntoPage(
  page: Page,
  session: BrowserSessionData,
  options?: InjectSessionOptions
): Promise<void> {
  const finalOptions = { ...DEFAULT_OPTIONS, ...options };

  await page.addInitScript(
    ({ token, user, tokenStorageKey, userStorageKey }) => {
      window.localStorage.setItem(tokenStorageKey, token);
      window.localStorage.setItem(userStorageKey, JSON.stringify(user));
    },
    {
      token: session.token,
      user: session.user,
      tokenStorageKey: finalOptions.tokenStorageKey,
      userStorageKey: finalOptions.userStorageKey,
    }
  );
}

export async function createStorageStateFromSession(params: {
  browser: Browser;
  baseUrl: string;
  storageStatePath: string;
  session: BrowserSessionData;
  verifyPath?: string;
  tokenStorageKey?: string;
  userStorageKey?: string;
}): Promise<void> {
  const {
    browser,
    baseUrl,
    storageStatePath,
    session,
    verifyPath = '/',
    tokenStorageKey,
    userStorageKey,
  } = params;

  const context = await browser.newContext();
  const page = await context.newPage();

  await injectSessionIntoPage(page, session, {
    tokenStorageKey,
    userStorageKey,
  });

  await page.goto(`${baseUrl}${verifyPath}`, {
    waitUntil: 'domcontentloaded',
  });

  await context.storageState({ path: storageStatePath });
  await context.close();
}