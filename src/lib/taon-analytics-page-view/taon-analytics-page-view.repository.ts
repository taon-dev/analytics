//#region imports
import { TaonBaseRepository, TaonRepository } from 'taon/src';
import { Raw } from 'taon-typeorm/src';

import { TaonAnalyticsPageViewEntity } from './taon-analytics-page-view.entity';
//#endregion

@TaonRepository({
  className: 'TaonAnalyticsPageViewRepository',
})
export class TaonAnalyticsPageViewRepository extends TaonBaseRepository<TaonAnalyticsPageViewEntity> {
  entityClassResolveFn: () => typeof TaonAnalyticsPageViewEntity = () => TaonAnalyticsPageViewEntity;

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