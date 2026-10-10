//#region imports
import { Routes } from '@angular/router';
import { adminLazyRoute } from '@taon-dev/ui/src';
//#endregion

export const TaonAnalyticsVisitorBackofficeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./taon-analytics-visitor-backoffice.component').then(m => m.TaonAnalyticsVisitorBackofficeComponent),

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
 * By default exporting TaonAnalyticsVisitorBackofficeRoutes,
 * the command `taon generate:app:routes`
 * will automatically add them to the root routes in ./src/app.ts.
 */
// export default TaonAnalyticsVisitorBackofficeRoutes;