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
  entityClassResolveFn: () => typeof TaonAnalyticsPageViewEntity = () => TaonAnalyticsPageViewEntity;

  private readonly taonAnalyticsPageViewRepository = this.injectCustomRepo(TaonAnalyticsPageViewRepository);

  //#region methods & getters / hello world
  /**
   * TODO remove this demo example method
   */
  @GET()
  helloWord(@Query('yourName') yourName: string): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      const numOfEntities = await this.db.count();
      const numberOfEvenEntities =
        await this.taonAnalyticsPageViewRepository.countEntitesWithEvenId();
      return `Hello ${yourName || 'world'} from ${ClassHelpers.getName(TaonAnalyticsPageViewController)}
      controller..  ${numOfEntities} entites in db..
      ${numberOfEvenEntities} entites with even ids (2,4,6,8 etc.)
      `;
    };
    //#endregion
  }
  //#endregion
}