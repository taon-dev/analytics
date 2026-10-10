export const ANALYTICS_SESSION_TIMEOUT_MS = 30 * 60 * 1000;

export interface TaonAnalyticsActivity {
  visitorId: string;
  sessionId?: number | null;
  pageViewId?: number | null;
  path: string;
  pageView: boolean;
  title?: string | null;
  language?: string | null;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
}

export interface TaonAnalyticsActivityResult {
  sessionId: number;
  pageViewId: number;
}

export interface TaonAnalyticsOverview {
  uniqueVisitors: number;
  sessions: number;
  pageViews: number;
}

export interface TaonAnalyticsEventInput {
  name: string;
  sessionId?: number | null;
  visitorId?: string | null;
  category?: string | null;
  path?: string | null;
  data?: Record<string, unknown> | null;
}
