export type Role = 'Admin' | 'Staff';

export const UsersRequests = {
    list(params?: { page?: number; pageSize?: number; role?: Role; q?: string }) {
        const p = params ?? {};
        const page = p.page ?? 1;
        const pageSize = p.pageSize ?? 10;

        const search = new URLSearchParams();
        search.set('page', String(page));
        search.set('pageSize', String(pageSize));
        if (p.role) search.set('role', p.role);
        if (p.q) search.set('q', p.q);

        return `/api/users?${search.toString()}`;
    },

    create(payload: { email: string; password: string; role: Role }) {
        return payload;
    },

    update(payload: { email?: string; role?: Role }) {
        return payload;
    }
};
