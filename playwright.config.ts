import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { env } from './playwright/config/env';
import path from 'path';

const testDir = defineBddConfig({
  features: 'playwright/e2e/bdd/features/**/*.feature',
  steps: [
      'playwright/e2e/bdd/steps/**/*.ts',
      'playwright/support/bdd.fixtures.ts',
    ],
  outputDir: 'playwright/e2e/bdd/generated',
});

export default defineConfig({
    testDir: path.resolve(__dirname, 'playwright/e2e'),
    timeout: 30_000,
    expect: { timeout: 5_000 },

    // Nice defaults for CI + local
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,

    // Artifacts (folders exist; many are gitignored)
    reporter: [['html', { open: 'never' }], ['line']],

    // ✅ Absolute paths so they work no matter which config is used
    globalSetup: path.resolve(__dirname, 'playwright/support/global-setup.ts'),
    globalTeardown: path.resolve(__dirname, 'playwright/support/global-teardown.ts'),

    use: {
        baseURL: env.UI_BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        storageState: 'playwright/support/storage/state.json',

        // Keep downloads in your dedicated folder
        acceptDownloads: true
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ]
});
