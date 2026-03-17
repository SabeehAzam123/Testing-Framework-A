import baseConfig from '../../playwright.config';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  ...baseConfig,
  grep: /@ui/,
  use: {
    ...baseConfig.use,
    storageState: 'playwright/support/storage/state.staff.json'
  }
});