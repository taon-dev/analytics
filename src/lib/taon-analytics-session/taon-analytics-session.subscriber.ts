//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { TaonAnalyticsSessionEntity } from './taon-analytics-session.entity';
import { TaonAnalyticsSessionProvider } from './taon-analytics-session.provider';
//#endregion

@TaonSubscriber<TaonAnalyticsSessionSubscriber>({
  className: 'TaonAnalyticsSessionSubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class TaonAnalyticsSessionSubscriber extends TaonBaseSubscriberForEntity {
  private readonly taonAnalyticsSessionProvider = this.injectProvider(TaonAnalyticsSessionProvider);
  listenTo(): typeof TaonAnalyticsSessionEntity {
    return TaonAnalyticsSessionEntity;
  }
}