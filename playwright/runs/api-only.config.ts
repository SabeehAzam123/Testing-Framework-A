import baseConfig from '../../playwright.config';
import { defineConfig } from '@playwright/test';
import { TAGS } from '../config/testTags';

export default defineConfig({
    ...baseConfig,
    grep: /@api/,
    use: {
        ...baseConfig.use,
        storageState: undefined,
        screenshot: 'off',
        video: 'off',
        trace: 'off'
    }
});
