import { expect, type APIResponse } from '@playwright/test';
import {
  UsersListResponseSchema,
  UserCreateResponseSchema,
  UserUpdateResponseSchema
} from '../contracts/users.contracts';

export const UsersAssertions = {
  async expectList(res: APIResponse) {
    expect(res.status()).toBe(200);
    const json = await res.json();
    const parsed = UsersListResponseSchema.safeParse(json);
    expect(parsed.success, 'Users list schema mismatch').toBe(true);
    return parsed.success ? parsed.data : null;
  },

  async expectCreated(res: APIResponse) {
    expect(res.status()).toBe(201);
    const json = await res.json();
    const parsed = UserCreateResponseSchema.safeParse(json);
    expect(parsed.success, 'User create schema mismatch').toBe(true);
    return parsed.success ? parsed.data : null;
  },

  async expectUpdated(res: APIResponse) {
    expect(res.status()).toBe(200);
    const json = await res.json();
    const parsed = UserUpdateResponseSchema.safeParse(json);
    expect(parsed.success, 'User update schema mismatch').toBe(true);
    return parsed.success ? parsed.data : null;
  },

  async expectDeleted(res: APIResponse) {
    expect(res.status()).toBe(204);
  }
};