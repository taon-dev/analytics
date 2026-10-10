//#region imports
import { createContext, TaonBaseContext } from 'taon/src';
import { TaonAnalyticsMiddleware } from '../taon-analytics.middleware';

import { TaonAnalyticsVisitorEntity } from './taon-analytics-visitor.entity';
import { TaonAnalyticsVisitorController } from './taon-analytics-visitor.controller';
import { TaonAnalyticsVisitorRepository } from './taon-analytics-visitor.repository';
// import { TaonAnalyticsVisitorKvRepository } from './taon-analytics-visitor.kv.repository';
import { TaonAnalyticsVisitorProvider } from './taon-analytics-visitor.provider';
// import { TaonAnalyticsVisitorMiddleware } from './taon-analytics-visitor.middleware';
// import { TaonAnalyticsVisitorSubscriber } from './taon-analytics-visitor.subscriber';
//#endregion

export const TaonAnalyticsVisitorAbstractContext = createContext(() => ({
  contextName: 'TaonAnalyticsVisitorAbstractContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { TaonAnalyticsVisitorEntity },
  controllers: { TaonAnalyticsVisitorController },
  repositories: {
    // TaonAnalyticsVisitorKvRepository
    TaonAnalyticsVisitorRepository,
  },
  providers: { TaonAnalyticsVisitorProvider },
  middlewares: { TaonAnalyticsMiddleware },
  // subscribers: { TaonAnalyticsVisitorSubscriber },
}));