// playwright/data/factories/user.factory.ts

import {
  CreateUserInputSchema,
  UpdateUserInputSchema,
  type CreateUserInput,
  type UpdateUserInput,
  type Role,
} from '@data/schemas/user.schema';

type CreateUserOverrides = Partial<CreateUserInput>;
type UpdateUserOverrides = Partial<UpdateUserInput>;

function uniqueNumber(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function uniqueEmail(prefix = 'user'): string {
  return `${prefix}.${uniqueNumber()}@test.com`;
}

export class UserFactory {
  static create(overrides: CreateUserOverrides = {}): CreateUserInput {
    const candidate: CreateUserInput = {
      email: uniqueEmail('user'),
      password: 'Secret12',
      role: 'Staff',
      ...overrides,
    };

    return CreateUserInputSchema.parse(candidate);
  }

  static admin(overrides: CreateUserOverrides = {}): CreateUserInput {
    return this.create({
      role: 'Admin',
      email: uniqueEmail('admin'),
      ...overrides,
    });
  }

  static staff(overrides: CreateUserOverrides = {}): CreateUserInput {
    return this.create({
      role: 'Staff',
      email: uniqueEmail('staff'),
      ...overrides,
    });
  }

  static update(overrides: UpdateUserOverrides = {}): UpdateUserInput {
    const candidate: UpdateUserInput = {
      email: uniqueEmail('updated'),
      role: 'Staff',
      ...overrides,
    };

    return UpdateUserInputSchema.parse(candidate);
  }

  static updateRole(role: Role, overrides: UpdateUserOverrides = {}): UpdateUserInput {
    return this.update({
      role,
      ...overrides,
    });
  }
}