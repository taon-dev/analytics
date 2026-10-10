//#region imports
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonAnalyticsSessionEntity } from './taon-analytics-session.entity';
import { TaonAnalyticsSessionController } from './taon-analytics-session.controller';
import { TaonAnalyticsSessionRepository } from './taon-analytics-session.repository';
// import { TaonAnalyticsSessionKvRepository } from './taon-analytics-session.kv.repository';
import { TaonAnalyticsSessionProvider } from './taon-analytics-session.provider';
// import { TaonAnalyticsSessionMiddleware } from './taon-analytics-session.middleware';
// import { TaonAnalyticsSessionSubscriber } from './taon-analytics-session.subscriber';
//#endregion

export const TaonAnalyticsSessionAbstractContext = createContext(() => ({
  contextName: 'TaonAnalyticsSessionAbstractContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { TaonAnalyticsSessionEntity },
  controllers: { TaonAnalyticsSessionController },
  repositories: {
    // TaonAnalyticsSessionKvRepository
    TaonAnalyticsSessionRepository,
  },
  providers: { TaonAnalyticsSessionProvider },
  // middlewares: { TaonAnalyticsSessionMiddleware },
  // subscribers: { TaonAnalyticsSessionSubscriber },
}));