//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { TaonAnalyticsPageViewEntity } from './taon-analytics-page-view.entity';
import { TaonAnalyticsPageViewProvider } from './taon-analytics-page-view.provider';
//#endregion

@TaonSubscriber<TaonAnalyticsPageViewSubscriber>({
  className: 'TaonAnalyticsPageViewSubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class TaonAnalyticsPageViewSubscriber extends TaonBaseSubscriberForEntity {
  private readonly taonAnalyticsPageViewProvider = this.injectProvider(TaonAnalyticsPageViewProvider);
  listenTo(): typeof TaonAnalyticsPageViewEntity {
    return TaonAnalyticsPageViewEntity;
  }
}