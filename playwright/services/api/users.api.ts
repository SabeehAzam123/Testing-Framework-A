import type { BaseClient } from '../../core/http/baseClient';
import type { Role } from '../../api-kit/requests/users.requests';
import { UsersRequests } from '../../api-kit/requests/users.requests';
import { UsersListResponseSchema } from '../../api-kit/contracts/users.contracts';

export const UsersApi = {
    list(client: BaseClient, path: string, token: string) {
        return client.get(path, {
            headers: { authorization: `Bearer ${token}` }
        });
    },

    create(client: BaseClient, payload: { email: string; password: string; role: Role }, token: string) {
        return client.post('/api/users', {
            data: payload,
            headers: { authorization: `Bearer ${token}` }
        });
    },

    update(client: BaseClient, id: string, payload: { email?: string; role?: Role }, token: string) {
        return client.put(`/api/users/${id}`, {
            data: payload,
            headers: { authorization: `Bearer ${token}` }
        });
    },

    remove(client: BaseClient, id: string, token: string) {
        return client.delete(`/api/users/${id}`, {
            headers: { authorization: `Bearer ${token}` }
        });
    },

    /**
     * Resolves the "real" user id by email using the list endpoint.
     * Supports either `id` or `_id` fields returned by the API.
     */
    async resolveIdByEmail(client: BaseClient, email: string, token: string): Promise<string> {
        // Avoid query params because backend returns 422 validation error.
        const res = await client.get('/api/users', {
            headers: { authorization: `Bearer ${token}` }
        });

        if (res.status() !== 200) {
            const body = await res.text().catch(() => '');
            console.log('resolveIdByEmail list status:', res.status());
            console.log('resolveIdByEmail list body:', body);
            return '';
        }

        const json: any = await res.json().catch(() => ({}));

        // Expected shape: { data: [...], page, pageSize, total }
        const rows = Array.isArray(json?.data) ? json.data : [];

        const found = rows.find((u: any) => String(u.email ?? '').toLowerCase() === email.toLowerCase());
        if (!found) return '';

        return String(found._id ?? found.id ?? '');
    }
};
