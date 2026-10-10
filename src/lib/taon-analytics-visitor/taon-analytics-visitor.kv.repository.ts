//#region imports
import {
  TaonBaseRepository,
  TaonBaseKvRepository,
  TaonRepository,
} from 'taon/src';

import { TaonAnalyticsVisitorEntity } from './taon-analytics-visitor.entity';
//#endregion

@TaonRepository({
  className: 'TaonAnalyticsVisitorKvRepository',
})
export class TaonAnalyticsVisitorKvRepository extends TaonBaseKvRepository<{
  usersToNotify: TaonAnalyticsVisitorEntity[];
}> {
  async notifyUsers(users: TaonAnalyticsVisitorEntity[]) {
    this.set('usersToNotify', users);
  }
}