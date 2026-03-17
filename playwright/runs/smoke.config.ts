import baseConfig from '../../playwright.config';
import { defineConfig } from '@playwright/test';
import { TAGS } from '../config/testTags';

export default defineConfig({
    ...baseConfig,
    grep: /@smoke/
    // Smoke should be fast + stable
    // retries: process.env.CI ? 2 : 0,
    // workers: process.env.CI ? 2 : 2
});
