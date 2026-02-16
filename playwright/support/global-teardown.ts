import type { FullConfig } from '@playwright/test';
import { logger } from '../core/logging/logger';

async function globalTeardown(_config: FullConfig) {
    logger.info('Global teardown');
    // TODO: cleanup seeded data, revoke tokens, etc.
}

export default globalTeardown;
