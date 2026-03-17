type Level = 'debug' | 'info' | 'warn' | 'error';
const levels: Record<Level, number> = { debug: 10, info: 20, warn: 30, error: 40 };

function getLevel(): Level {
    const v = (process.env.LOG_LEVEL || 'info').toLowerCase();
    return (['debug', 'info', 'warn', 'error'] as Level[]).includes(v as Level) ? (v as Level) : 'info';
}

function canLog(level: Level) {
    return levels[level] >= levels[getLevel()];
}

function fmt(msg: string, meta?: unknown) {
    return meta ? `${msg} ${JSON.stringify(meta)}` : msg;
}

export const logger = {
    debug: (msg: string, meta?: unknown) => { if (canLog('debug')) console.log(fmt(msg, meta)); },
    info: (msg: string, meta?: unknown) => { if (canLog('info')) console.log(fmt(msg, meta)); },
    warn: (msg: string, meta?: unknown) => { if (canLog('warn')) console.warn(fmt(msg, meta)); },
    error: (msg: string, meta?: unknown) => { if (canLog('error')) console.error(fmt(msg, meta)); }
};
