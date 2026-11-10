//#region imports
import { TaonBaseRepository, TaonRepository } from 'taon/src';
import { Raw } from 'taon-typeorm/src';

import { TaonAnalyticsPageViewEntity } from './taon-analytics-page-view.entity';
//#endregion

@TaonRepository({
  className: 'TaonAnalyticsPageViewRepository',
})
export class TaonAnalyticsPageViewRepository extends TaonBaseRepository<TaonAnalyticsPageViewEntity> {
  entityClassResolveFn: () => typeof TaonAnalyticsPageViewEntity = () =>
    TaonAnalyticsPageViewEntity;
}
