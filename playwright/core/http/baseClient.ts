import type { APIRequestContext, APIResponse } from '@playwright/test';

export type LoggerLike = {
    info: (msg: string, meta?: unknown) => void;
    error: (msg: string, meta?: unknown) => void;
};

export class BaseClient {
    constructor(
        private readonly api: APIRequestContext,
        private readonly log: LoggerLike
    ) {}

    get(path: string, options?: Parameters<APIRequestContext['get']>[1]): Promise<APIResponse> {
        this.log.info(`HTTP GET ${path}`);
        return this.api.get(path, options);
    }

    post(path: string, options?: Parameters<APIRequestContext['post']>[1]): Promise<APIResponse> {
        this.log.info(`HTTP POST ${path}`);
        return this.api.post(path, options);
    }

    put(path: string, options?: Parameters<APIRequestContext['put']>[1]): Promise<APIResponse> {
        this.log.info(`HTTP PUT ${path}`);
        return this.api.put(path, options);
    }

    delete(path: string, options?: Parameters<APIRequestContext['delete']>[1]): Promise<APIResponse> {
        this.log.info(`HTTP DELETE ${path}`);
        return this.api.delete(path, options);
    }
}
