// playwright/api-kit/contracts/users.contracts.ts

import { z } from 'zod';
import { RoleSchema } from '@data/schemas/user.schema';

export const UserRowSchema = z.object({
  id: z.string().min(1).optional(),
  _id: z.string().min(1).optional(),
  email: z.string().email(),
  role: RoleSchema,
  createdAt: z.string().min(1),
}).refine((v) => !!(v.id || v._id), {
  message: 'User must have id or _id',
});

export const UsersListResponseSchema = z.object({
  data: z.array(UserRowSchema),
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
});

export const UserCreateResponseSchema = z.object({
  data: z.object({
    id: z.string().min(1),
    email: z.string().email(),
    role: RoleSchema,
    createdAt: z.string().min(1),
  }),
});

export const UserUpdateResponseSchema = z.object({
  data: z.object({
    id: z.string().min(1),
    email: z.string().email(),
    role: RoleSchema,
    updatedAt: z.string().min(1),
  }),
});