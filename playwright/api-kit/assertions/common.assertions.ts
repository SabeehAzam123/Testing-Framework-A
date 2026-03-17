import { expect, type APIResponse } from '@playwright/test';

export const CommonAssertions = {
    async expectStatus(res: APIResponse, status: number) {
        expect(res.status(), `Expected HTTP ${status}, got ${res.status()}`).toBe(status);
    },

    async expectJson(res: APIResponse) {
        const ct = res.headers()['content-type'] ?? '';
        expect(ct.toLowerCase()).toContain('application/json');
        return res.json();
    },

    async expectNoContent(res: APIResponse) {
        expect(res.status(), `Expected 204, got ${res.status()}`).toBe(204);
    }
};
