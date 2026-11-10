//#region imports
import {
  Taon,
  ClassHelpers,
  TaonController,
  TaonBaseCrudController,
  Query,
  GET,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonAnalyticsPageViewEntity } from './taon-analytics-page-view.entity';
import { TaonAnalyticsPageViewRepository } from './taon-analytics-page-view.repository';
//#endregion

@TaonController<TaonAnalyticsPageViewController>({
  className: 'TaonAnalyticsPageViewController',
  // allowedMethods: []
})
export class TaonAnalyticsPageViewController extends TaonBaseCrudController<
  TaonAnalyticsPageViewEntity,
  {
    /* file upload query params type */
  },
  TaonAnalyticsPageViewController
> {
  entityClassResolveFn: () => typeof TaonAnalyticsPageViewEntity = () =>
    TaonAnalyticsPageViewEntity;

  private readonly taonAnalyticsPageViewRepository = this.injectCustomRepo(
    TaonAnalyticsPageViewRepository,
  );
}
