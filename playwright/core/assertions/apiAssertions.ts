// playwright/core/assertions/apiAssertions.ts

import { expect, APIResponse } from '@playwright/test';
import { ErrorResponseSchema, type ErrorResponse } from '@data/schemas/error.schema';

export async function expectStatus(
  response: APIResponse,
  expectedStatus: number
): Promise<void> {
  expect(
    response.status(),
    `Expected status ${expectedStatus} but got ${response.status()}`
  ).toBe(expectedStatus);
}

export function expectJsonContentType(response: APIResponse): void {
  const contentType = response.headers()['content-type'] || '';
  expect(contentType, 'Expected JSON content-type').toContain('application/json');
}

export async function expectJsonBody<T>(response: APIResponse): Promise<T> {
  expectJsonContentType(response);
  return (await response.json()) as T;
}

export async function expectOkJson<T>(
  response: APIResponse,
  expectedStatus = 200
): Promise<T> {
  await expectStatus(response, expectedStatus);
  return expectJsonBody<T>(response);
}

export async function expectNoContent(
  response: APIResponse,
  expectedStatus = 204
): Promise<void> {
  await expectStatus(response, expectedStatus);
  const bodyText = await response.text();
  expect(bodyText).toBe('');
}

export async function expectUnauthorized(response: APIResponse): Promise<void> {
  await expectStatus(response, 401);
}

export async function expectForbidden(response: APIResponse): Promise<void> {
  await expectStatus(response, 403);
}

export async function expectNotFound(response: APIResponse): Promise<void> {
  await expectStatus(response, 404);
}

export async function expectErrorJson(
  response: APIResponse,
  expectedStatus: number
): Promise<ErrorResponse> {
  await expectStatus(response, expectedStatus);
  const body = await expectJsonBody<unknown>(response);
  return ErrorResponseSchema.parse(body);
}