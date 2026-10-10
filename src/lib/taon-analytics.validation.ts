import { Taon } from 'taon/src';

export function analyticsError(message: string): never {
  Taon.error({ message, status: 400 });
  throw new Error(message);
}

export function isAnalyticsVisitorId(value: unknown): value is string {
  return typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export function requireAnalyticsVisitorId(value: string): void {
  if (!isAnalyticsVisitorId(value)) {
    analyticsError('visitorId must be a random UUID.');
  }
}

export function requireAnalyticsId(value: number | null | undefined): void {
  if (value != null && (!Number.isSafeInteger(value) || value <= 0)) {
    analyticsError('Analytics IDs must be positive integers.');
  }
}

export function requireAnalyticsText(
  value: string | null | undefined,
  field: string,
  required = false,
): void {
  if (
    (required && (typeof value !== 'string' || !value.trim())) ||
    (value != null && (typeof value !== 'string' || value.length > 4096))
  ) {
    analyticsError(`${field} must be ${required ? 'a non-empty' : 'an optional'} string of at most 4096 characters.`);
  }
}

export function analyticsUserId(value: unknown): number | null {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}
