//#region imports
import { Routes } from '@angular/router';
import { adminLazyRoute } from '@taon-dev/ui/src';
//#endregion

export const TaonAnalyticsPageViewBackofficeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./taon-analytics-page-view-backoffice.component').then(m => m.TaonAnalyticsPageViewBackofficeComponent),

    children: [
      // adminLazyRoute({
      //   path: 'dashboard',
      //   menuItem: 'Dashboard',
      //   icon: 'dashboard',
      //   expandable: false,
      //   loader: () =>
      //     import('./anothermodule.routes').then(m => m.DashboardRoutes),
      // }),
    ],
  },
];

/**
 * By default exporting TaonAnalyticsPageViewBackofficeRoutes,
 * the command `taon generate:app:routes`
 * will automatically add them to the root routes in ./src/app.ts.
 */
// export default TaonAnalyticsPageViewBackofficeRoutes;