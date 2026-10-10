//#region imports
import {
  TaonBaseRepository,
  TaonBaseKvRepository,
  TaonRepository,
} from 'taon/src';

import { TaonAnalyticsPageViewEntity } from './taon-analytics-page-view.entity';
//#endregion

@TaonRepository({
  className: 'TaonAnalyticsPageViewKvRepository',
})
export class TaonAnalyticsPageViewKvRepository extends TaonBaseKvRepository<{
  usersToNotify: TaonAnalyticsPageViewEntity[];
}> {
  async notifyUsers(users: TaonAnalyticsPageViewEntity[]) {
    this.set('usersToNotify', users);
  }
}