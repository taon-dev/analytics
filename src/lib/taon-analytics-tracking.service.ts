import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DestroyRef, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { firstValueFrom, filter } from 'rxjs';
import { TaonBaseAngularService } from 'taon/src';

import { TaonAnalyticsVisitorController } from './taon-analytics-visitor/taon-analytics-visitor.controller';
import { TaonAnalyticsEventController } from './taon-analytics-event/taon-analytics-event.controller';
import type { TaonAnalyticsEventInput } from './taon-analytics.models';
import { isAnalyticsVisitorId } from './taon-analytics.validation';

@Injectable()
export class TaonAnalyticsTrackingService extends TaonBaseAngularService {
  private readonly visitors = this.injectController(TaonAnalyticsVisitorController);
  private readonly events = this.injectController(TaonAnalyticsEventController);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly browserPlatformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private visitorId!: string;
  private sessionId: number | null = null;
  private pageViewId: number | null = null;
  private started = false;
  private pending: Promise<void> = Promise.resolve();
  private lastActivitySentAt = 0;

  start(): void {
    if (this.started || !isPlatformBrowser(this.browserPlatformId)) {
      return;
    }
    const browser = this.document.defaultView!;
    try {
      const storedVisitor = browser.localStorage.getItem('taon.analytics.visitorId');
      if (storedVisitor && !isAnalyticsVisitorId(storedVisitor)) {
        console.warn('[analytics] Discarding invalid stored visitor ID.');
      }
      this.visitorId = isAnalyticsVisitorId(storedVisitor) ? storedVisitor : browser.crypto.randomUUID();
      browser.localStorage.setItem('taon.analytics.visitorId', this.visitorId);
      const storedSession = browser.sessionStorage.getItem('taon.analytics.sessionId');
      this.sessionId = storedSession ? Number(storedSession) : null;
      if (this.sessionId != null && (!Number.isSafeInteger(this.sessionId) || this.sessionId <= 0)) {
        console.warn('[analytics] Discarding invalid stored session ID.');
        this.sessionId = null;
      }
    } catch (error) {
      console.error('[analytics] Persistent storage is unavailable; tracking was not started.', error);
      return;
    }
    this.started = true;
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(event => this.queueActivity(event.urlAfterRedirects, true));
    if (this.router.navigated) {
      this.queueActivity(this.router.url, true);
    }
    const onActivity = () => {
      if (this.pageViewId == null || this.document.visibilityState === 'hidden' ||
          Date.now() - this.lastActivitySentAt < 60_000) {
        return;
      }
      this.lastActivitySentAt = Date.now();
      this.queueActivity(this.router.url, false);
    };
    for (const name of ['pointerdown', 'keydown', 'visibilitychange']) {
      this.document.addEventListener(name, onActivity);
    }
    this.destroyRef.onDestroy(() => {
      for (const name of ['pointerdown', 'keydown', 'visibilitychange']) {
        this.document.removeEventListener(name, onActivity);
      }
    });
  }

  async recordEvent(
    name: string,
    options: Pick<TaonAnalyticsEventInput, 'category' | 'data' | 'path'> = {},
  ): Promise<void> {
    if (!this.started) {
      throw new Error('Analytics tracking must be started before recording an event.');
    }
    await this.pending;
    await firstValueFrom(this.events.record({
      ...options,
      name,
      visitorId: this.visitorId,
      sessionId: this.sessionId,
      path: options.path ?? this.router.url.split(/[?#]/)[0],
    }).request!().observable);
  }

  private queueActivity(url: string, pageView: boolean): void {
    const path = url.split(/[?#]/)[0];
    const title = Promise.resolve().then(() => this.document.title);
    const outerParams = new URLSearchParams(this.document.defaultView!.location.search);
    const routeParams = new URLSearchParams(url.split('?')[1]?.split('#')[0] ?? '');
    const utm = (key: string) => routeParams.get(key) ?? outerParams.get(key);
    this.pending = this.pending.then(async () => {
      const response = await firstValueFrom(this.visitors.collect({
        visitorId: this.visitorId,
        sessionId: this.sessionId,
        pageViewId: this.pageViewId,
        path,
        title: await title,
        pageView,
        language: this.document.defaultView!.navigator.language,
        referrer: this.document.referrer || null,
        utmSource: utm('utm_source'),
        utmMedium: utm('utm_medium'),
        utmCampaign: utm('utm_campaign'),
      }).request!().observable);
      const result = response.body.json;
      this.sessionId = result.sessionId;
      this.pageViewId = result.pageViewId;
      this.lastActivitySentAt = Date.now();
      this.document.defaultView!.sessionStorage.setItem('taon.analytics.sessionId', String(this.sessionId));
    }).catch((error: unknown) => {
      console.error('[analytics] Unable to collect activity.', error);
    });
  }
}
