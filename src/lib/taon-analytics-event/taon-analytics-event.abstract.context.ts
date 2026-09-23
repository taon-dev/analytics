//#region imports
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonAnalyticsEventEntity } from './taon-analytics-event.entity';
import { TaonAnalyticsEventController } from './taon-analytics-event.controller';
import { TaonAnalyticsEventRepository } from './taon-analytics-event.repository';
// import { TaonAnalyticsEventKvRepository } from './taon-analytics-event.kv.repository';
import { TaonAnalyticsEventProvider } from './taon-analytics-event.provider';
// import { TaonAnalyticsEventMiddleware } from './taon-analytics-event.middleware';
// import { TaonAnalyticsEventSubscriber } from './taon-analytics-event.subscriber';
//#endregion

export const TaonAnalyticsEventAbstractContext = createContext(() => ({
  contextName: 'TaonAnalyticsEventAbstractContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { TaonAnalyticsEventEntity },
  controllers: { TaonAnalyticsEventController },
  repositories: {
    // TaonAnalyticsEventKvRepository
    TaonAnalyticsEventRepository,
  },
  providers: { TaonAnalyticsEventProvider },
  // middlewares: { TaonAnalyticsEventMiddleware },
  // subscribers: { TaonAnalyticsEventSubscriber },
}));