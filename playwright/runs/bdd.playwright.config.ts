// playwright/runs/bdd.playwright.config.ts

import path from 'path';
import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { env } from '../config/env';

const featuresRoot = path.resolve(__dirname, '../e2e/bdd/features');

const testDir = defineBddConfig({
  featuresRoot,
  features: path.join(featuresRoot, '**/*.feature'),
  steps: [
    path.resolve(__dirname, '../e2e/bdd/steps/**/*.ts'),
    path.resolve(__dirname, '../support/bdd.fixtures.ts'),
  ],
  outputDir: path.resolve(__dirname, '../e2e/bdd/generated'),
});

export default defineConfig({
  testDir,

  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html'], ['list']],

  globalSetup: path.resolve(__dirname, '../support/global-setup.ts'),
  globalTeardown: path.resolve(__dirname, '../support/global-teardown.ts'),

  use: {
    baseURL: env.UI_BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    storageState: path.resolve(__dirname, '../support/storage/state.json'),
  },
});