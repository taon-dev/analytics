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

import { TaonAnalyticsEventEntity } from './taon-analytics-event.entity';
import { TaonAnalyticsEventRepository } from './taon-analytics-event.repository';
//#endregion

@TaonController<TaonAnalyticsEventController>({
  className: 'TaonAnalyticsEventController',
})
export class TaonAnalyticsEventController extends TaonBaseCrudController<TaonAnalyticsEventEntity> {
  entityClassResolveFn: () => typeof TaonAnalyticsEventEntity = () => TaonAnalyticsEventEntity;

  taonAnalyticsEventRepository = this.injectCustomRepo(TaonAnalyticsEventRepository);

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
        await this.taonAnalyticsEventRepository.countEntitesWithEvenId();
      return `Hello ${yourName || 'world'} from ${ClassHelpers.getName(TaonAnalyticsEventController)}
      controller..  ${numOfEntities} entites in db..
      ${numberOfEvenEntities} entites with even ids (2,4,6,8 etc.)
      `;
    };
    //#endregion
  }
  //#endregion
}