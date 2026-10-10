//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { TaonAnalyticsVisitorEntity } from './taon-analytics-visitor.entity';
import { TaonAnalyticsVisitorProvider } from './taon-analytics-visitor.provider';
//#endregion

@TaonSubscriber<TaonAnalyticsVisitorSubscriber>({
  className: 'TaonAnalyticsVisitorSubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class TaonAnalyticsVisitorSubscriber extends TaonBaseSubscriberForEntity {
  private readonly taonAnalyticsVisitorProvider = this.injectProvider(TaonAnalyticsVisitorProvider);
  listenTo(): typeof TaonAnalyticsVisitorEntity {
    return TaonAnalyticsVisitorEntity;
  }
}