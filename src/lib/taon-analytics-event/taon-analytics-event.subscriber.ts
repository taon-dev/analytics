//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { TaonAnalyticsEventEntity } from './taon-analytics-event.entity';
import { TaonAnalyticsEventProvider } from './taon-analytics-event.provider';
//#endregion

@TaonSubscriber<TaonAnalyticsEventSubscriber>({
  className: 'TaonAnalyticsEventSubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class TaonAnalyticsEventSubscriber extends TaonBaseSubscriberForEntity {
  taonAnalyticsEventProvider = this.injectProvider(TaonAnalyticsEventProvider);
  listenTo(): typeof TaonAnalyticsEventEntity {
    return TaonAnalyticsEventEntity;
  }
}