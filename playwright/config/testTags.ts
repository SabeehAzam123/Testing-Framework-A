// Centralized tags used across specs.
// Use these in test titles or describe blocks, e.g.:
// test('@smoke @ui login works', async () => {})

export const TAGS = {
  SMOKE: '@smoke',
  REGRESSION: '@regression',
  API: '@api',
  UI: '@ui',
  INT: '@int'
} as const;
