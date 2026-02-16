import { defineConfig, devices } from '@playwright/test';
import { env } from './playwright/config/env';

export default defineConfig({
    testDir: './playwright/e2e',
    timeout: 30_000,
    expect: { timeout: 5_000 },

    // Nice defaults for CI + local
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,

    // Artifacts (folders exist; many are gitignored)
    reporter: [['html', { open: 'never' }], ['line']],

    globalSetup: './playwright/support/global-setup.ts',
    globalTeardown: './playwright/support/global-teardown.ts',

    use: {
        baseURL: env.UI_BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',

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
