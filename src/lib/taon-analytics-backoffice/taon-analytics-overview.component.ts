import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaonAnalyticsVisitorApiService } from '../taon-analytics-visitor/taon-analytics-visitor.api.service';
import type { TaonAnalyticsOverview } from '../taon-analytics.models';

@Component({
  selector: 'taon-analytics-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TaonAnalyticsVisitorApiService],
  template: `
    <h1>Analytics Overview</h1>
    @if (error()) {
      <p role="alert">{{ error() }}</p>
    } @else if (stats(); as stats) {
      <dl>
        <dt>Unique visitors</dt><dd>{{ stats.uniqueVisitors }}</dd>
        <dt>Sessions</dt><dd>{{ stats.sessions }}</dd>
        <dt>Page views</dt><dd>{{ stats.pageViews }}</dd>
      </dl>
    } @else {
      <p role="status">Loading analytics...</p>
    }
  `,
})
export class TaonAnalyticsOverviewComponent {
  readonly stats = signal<TaonAnalyticsOverview | null>(null);
  readonly error = signal('');
  private readonly api = inject(TaonAnalyticsVisitorApiService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.api.overview().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: stats => this.stats.set(stats),
      error: (error: unknown) => {
        console.error('[analytics] Unable to load overview.', error);
        this.error.set('Analytics statistics could not be loaded.');
      },
    });
  }
}
