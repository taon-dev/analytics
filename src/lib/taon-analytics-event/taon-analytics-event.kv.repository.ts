//#region imports
import {
  TaonBaseRepository,
  TaonBaseKvRepository,
  TaonRepository,
} from 'taon/src';

import { TaonAnalyticsEventEntity } from './taon-analytics-event.entity';
//#endregion

@TaonRepository({
  className: 'TaonAnalyticsEventKvRepository',
})
export class TaonAnalyticsEventKvRepository extends TaonBaseKvRepository<{
  usersToNotify: TaonAnalyticsEventEntity[];
}> {
  async notifyUsers(users: TaonAnalyticsEventEntity[]) {
    this.set('usersToNotify', users);
  }
}