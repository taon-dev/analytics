//#region imports
import { TaonBaseRepository, TaonRepository } from 'taon/src';
import { Raw } from 'taon-typeorm/src';

import { TaonAnalyticsEventEntity } from './taon-analytics-event.entity';
//#endregion

@TaonRepository({
  className: 'TaonAnalyticsEventRepository',
})
export class TaonAnalyticsEventRepository extends TaonBaseRepository<TaonAnalyticsEventEntity> {
  entityClassResolveFn: () => typeof TaonAnalyticsEventEntity = () => TaonAnalyticsEventEntity;

  /**
   * TODO remove this demo example method
   */
  async countEntitesWithEvenId(): Promise<number> {
    //#region @websqlFunc
    const result = await this.count({
      where: {
        id: Raw(alias => `${alias} % 2 = 0`),
      },
    });
    return result;
    //#endregion
  }
}