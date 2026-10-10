//#region imports
import { Routes } from '@angular/router';
import { adminLazyRoute } from '@taon-dev/ui/src';
//#endregion

export const TaonAnalyticsBackofficeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./taon-analytics-backoffice.component').then(
        m => m.TaonAnalyticsBackofficeComponent,
      ),

    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview' },
      {
        path: 'overview',
        data: { menuItem: 'Overview', icon: 'analytics', expandable: false },
        loadComponent: () =>
          import('./taon-analytics-overview.component').then(
            m => m.TaonAnalyticsOverviewComponent,
          ),
      },
      adminLazyRoute({
        path: 'visitors',
        menuItem: 'Visitors',
        icon: 'people',
        expandable: false,
        loader: () =>
          import('../taon-analytics-visitor/taon-analytics-visitor-backoffice/taon-analytics-visitor-backoffice.routes').then(
            m => m.TaonAnalyticsVisitorBackofficeRoutes,
          ),
      }),

      adminLazyRoute({
        path: 'page-view',
        menuItem: 'Pages View',
        icon: 'extension',
        expandable: false,
        loader: () =>
          import('../taon-analytics-page-view/taon-analytics-page-view-backoffice/taon-analytics-page-view-backoffice.routes').then(
            m => m.TaonAnalyticsPageViewBackofficeRoutes,
          ),
      }),

      adminLazyRoute({
        path: 'events',
        menuItem: 'Events',
        icon: 'extension',
        expandable: false,
        loader: () =>
          import('../taon-analytics-event/taon-analytics-events-backoffice/taon-analytics-events-backoffice.routes').then(
            m => m.TaonAnalyticsEventsBackofficeRoutes,
          ),
      }),

      adminLazyRoute({
        path: 'traffic-sources',
        menuItem: 'Traffic Sources',
        icon: 'extension',
        expandable: false,
        loader: () =>
          import('../taon-analytics-traffic-sources-backoffice/taon-analytics-traffic-sources-backoffice.routes').then(
            m => m.TaonAnalyticsTrafficSourcesBackofficeRoutes,
          ),
      }),
    ],
  },
];

/**
 * By default exporting TaonAnalyticsBackofficeRoutes,
 * the command `taon generate:app:routes`
 * will automatically add them to the root routes in ./src/app.ts.
 */
// export default TaonAnalyticsBackofficeRoutes;
