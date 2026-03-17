import type { BaseClient } from '../../core/http/baseClient';

export type LoginResponse = {
    data: {
        token: string;
        user: { id: string; email: string; role: 'Admin' | 'Staff' };
    };
};

export const AuthApi = {
    login(client: BaseClient, payload: { email: string; password: string }) {
        return client.post('/api/auth/login', { data: payload });
    }
};
