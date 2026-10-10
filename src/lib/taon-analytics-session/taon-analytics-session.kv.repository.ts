//#region imports
import {
  TaonBaseRepository,
  TaonBaseKvRepository,
  TaonRepository,
} from 'taon/src';

import { TaonAnalyticsSessionEntity } from './taon-analytics-session.entity';
//#endregion

@TaonRepository({
  className: 'TaonAnalyticsSessionKvRepository',
})
export class TaonAnalyticsSessionKvRepository extends TaonBaseKvRepository<{
  usersToNotify: TaonAnalyticsSessionEntity[];
}> {
  async notifyUsers(users: TaonAnalyticsSessionEntity[]) {
    this.set('usersToNotify', users);
  }
}