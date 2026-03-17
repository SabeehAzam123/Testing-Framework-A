// playwright/core/helpers/retry.ts

export type RetryOptions = {
  attempts?: number;
  delayMs?: number;
  shouldRetry?: (error: unknown, attempt: number) => boolean;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retry<T>(
  fn: () => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const attempts = options?.attempts ?? 3;
  const delayMs = options?.delayMs ?? 500;
  const shouldRetry =
    options?.shouldRetry ??
    (() => true);

  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      const allowed = shouldRetry(error, attempt);
      const isLast = attempt === attempts;

      if (!allowed || isLast) {
        throw error;
      }

      await sleep(delayMs);
    }
  }

  throw lastError;
}