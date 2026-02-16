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

    async get(path: string, options?: Parameters<APIRequestContext['get']>[1]): Promise<APIResponse> {
        this.log.info(`HTTP GET ${path}`);
        const res = await this.api.get(path, options);
        return res;
    }

    async post(path: string, options?: Parameters<APIRequestContext['post']>[1]): Promise<APIResponse> {
        this.log.info(`HTTP POST ${path}`);
        const res = await this.api.post(path, options);
        return res;
    }

    async put(path: string, options?: Parameters<APIRequestContext['put']>[1]): Promise<APIResponse> {
        this.log.info(`HTTP PUT ${path}`);
        const res = await this.api.put(path, options);
        return res;
    }

    async delete(path: string, options?: Parameters<APIRequestContext['delete']>[1]): Promise<APIResponse> {
        this.log.info(`HTTP DELETE ${path}`);
        const res = await this.api.delete(path, options);
        return res;
    }
}
