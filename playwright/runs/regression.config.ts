import baseConfig from '../../playwright.config';
import { defineConfig } from '@playwright/test';
import { TAGS } from '../config/testTags';

export default defineConfig({
    ...baseConfig,
    grep: /@regression/
    // grep: new RegExp(`\\${TAGS.REGRESSION}`),
    // retries: process.env.CI ? 2 : 0,
    // workers: process.env.CI ? 2 : undefined
});
