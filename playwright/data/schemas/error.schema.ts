// playwright/data/schemas/error.schema.ts

import { z } from 'zod';

export const ValidationIssueSchema = z.object({
  field: z.string().optional(),
  message: z.string(),
});

export const ErrorResponseSchema = z.object({
  message: z.string(),
  error: z.string().optional(),
  code: z.union([z.string(), z.number()]).optional(),
  details: z.array(ValidationIssueSchema).optional(),
});

export type ValidationIssue = z.infer<typeof ValidationIssueSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;