// playwright/data/schemas/user.schema.ts

import { z } from 'zod';

export const RoleSchema = z.enum(['Admin', 'Staff']);

export const UserEntitySchema = z.object({
  id: z.string().min(1).optional(),
  _id: z.string().min(1).optional(),
  email: z.string().email(),
  role: RoleSchema,
  createdAt: z.string().min(1).optional(),
  updatedAt: z.string().min(1).optional(),
}).refine((v) => !!(v.id || v._id), {
  message: 'User must have id or _id',
});

export const CreateUserInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: RoleSchema,
});

export const UpdateUserInputSchema = z.object({
  email: z.string().email().optional(),
  role: RoleSchema.optional(),
});

export type Role = z.infer<typeof RoleSchema>;
export type UserEntity = z.infer<typeof UserEntitySchema>;
export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserInputSchema>;