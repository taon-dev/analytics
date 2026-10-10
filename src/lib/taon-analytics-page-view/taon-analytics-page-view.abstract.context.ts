//#region imports
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonAnalyticsPageViewEntity } from './taon-analytics-page-view.entity';
import { TaonAnalyticsPageViewController } from './taon-analytics-page-view.controller';
import { TaonAnalyticsPageViewRepository } from './taon-analytics-page-view.repository';
// import { TaonAnalyticsPageViewKvRepository } from './taon-analytics-page-view.kv.repository';
import { TaonAnalyticsPageViewProvider } from './taon-analytics-page-view.provider';
// import { TaonAnalyticsPageViewMiddleware } from './taon-analytics-page-view.middleware';
// import { TaonAnalyticsPageViewSubscriber } from './taon-analytics-page-view.subscriber';
//#endregion

export const TaonAnalyticsPageViewAbstractContext = createContext(() => ({
  contextName: 'TaonAnalyticsPageViewAbstractContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { TaonAnalyticsPageViewEntity },
  controllers: { TaonAnalyticsPageViewController },
  repositories: {
    // TaonAnalyticsPageViewKvRepository
    TaonAnalyticsPageViewRepository,
  },
  providers: { TaonAnalyticsPageViewProvider },
  // middlewares: { TaonAnalyticsPageViewMiddleware },
  // subscribers: { TaonAnalyticsPageViewSubscriber },
}));