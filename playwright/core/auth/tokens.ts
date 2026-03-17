// playwright/core/auth/tokens.ts

export type JwtPayload = {
  exp?: number;
  iat?: number;
  sub?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
};

export function toBearer(token: string): string {
  return `Bearer ${token}`;
}

export function maskToken(token: string, visible = 6): string {
  if (!token) return '';
  if (token.length <= visible * 2) return token;
  return `${token.slice(0, visible)}...${token.slice(-visible)}`;
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);

    const json = Buffer.from(padded, 'base64').toString('utf-8');
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function getTokenExpiry(token: string): number | null {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp || typeof payload.exp !== 'number') return null;
  return payload.exp * 1000;
}

export function isTokenExpired(token: string, skewMs = 10_000): boolean {
  const expiry = getTokenExpiry(token);
  if (!expiry) return false;
  return Date.now() + skewMs >= expiry;
}