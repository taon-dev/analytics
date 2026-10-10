# Analytics

Small, anonymous visitor/session/page-view collection for Taon applications.
Include `TaonAnalyticsAbstractContext` in your application context. Provide
`TaonAnalyticsTrackingService` on the root Angular component and call `start()`
once after the Taon context has initialized. The example application does this
in its root component.

The random browser UUID is stored in localStorage; the current session ID is
stored in sessionStorage. Reloads reuse the session; 30 minutes without recorded
activity starts a new one. Navigation completions record page views. Basic
pointer/keyboard activity updates are throttled to once per minute. No
fingerprinting or user-agent parsing is performed; device/browser/OS fields
are reserved and nullable. Authenticated user IDs are taken from verified Taon
session tokens, never from the collection payload.

Overview shows all-time visitor, session and page-view counts. Visitors uses
the standard Taon datatable. Pages View, Events and Traffic Sources are
placeholders; their underlying data can be extended later.

Other Angular packages can inject the same tracking service and call:

```ts
await analytics.recordEvent('banner-click', {
  category: 'marketing',
  data: { bannerId: 'summer' },
});
```

Backend packages can inject `TaonAnalyticsEventRepository` and use `record()`.
All event names use the same generic table. Session/visitor/user associations
are optional for backend events.

Timestamps come from the backend. Page durations end at the next navigation
or the last observed activity when an expired session is next collected.
There is no unload beacon or background session-expiry job; durations are
approximate, not a measure of active attention.

Tables follow the project's `createTable`/TypeORM synchronization convention.
No event-specific tables or reporting charts are added.