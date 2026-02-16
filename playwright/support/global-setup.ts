import type { FullConfig } from '@playwright/test';
import { env } from '../config/env';
import { logger } from '../core/logging/logger';

async function globalSetup(_config: FullConfig) {
    // Force env validation to happen at startup
    logger.info(`Global setup: UI_BASE_URL=${env.UI_BASE_URL}`);
    logger.info(`Global setup: API_BASE_URL=${env.API_BASE_URL}`);

    // TODO: create auth storage state, seed data, etc.
}

export default globalSetup;
