import { env } from '../../config/env';

type Level = 'debug' | 'info' | 'warn' | 'error';

const levelOrder: Record<Level, number> = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40
};

function shouldLog(current: Level, incoming: Level): boolean {
    return levelOrder[incoming] >= levelOrder[current];
}

const currentLevel = (env.LOG_LEVEL as Level) || 'info';

export const logger = {
    debug: (msg: string, meta?: unknown) => {
        if (shouldLog(currentLevel, 'debug')) console.debug(`DEBUG: ${msg}`, meta ?? '');
    },
    info: (msg: string, meta?: unknown) => {
        if (shouldLog(currentLevel, 'info')) console.info(`INFO: ${msg}`, meta ?? '');
    },
    warn: (msg: string, meta?: unknown) => {
        if (shouldLog(currentLevel, 'warn')) console.warn(`WARN: ${msg}`, meta ?? '');
    },
    error: (msg: string, meta?: unknown) => {
        if (shouldLog(currentLevel, 'error')) console.error(`ERROR: ${msg}`, meta ?? '');
    }
};
