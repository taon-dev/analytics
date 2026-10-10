//#region imports
import {
  Taon,
  ClassHelpers,
  TaonController,
  TaonBaseCrudController,
  Query,
  GET,
  POST,
  Body,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonAnalyticsVisitorEntity } from './taon-analytics-visitor.entity';
import { TaonAnalyticsVisitorRepository } from './taon-analytics-visitor.repository';
import { TaonAnalyticsMiddleware } from '../taon-analytics.middleware';
import { analyticsUserId } from '../taon-analytics.validation';
import {
  TaonAnalyticsActivity,
  TaonAnalyticsActivityResult,
  TaonAnalyticsOverview,
} from '../taon-analytics.models';
//#endregion

@TaonController<TaonAnalyticsVisitorController>({
  className: 'TaonAnalyticsVisitorController',
  allowedMethods: ['getAll', 'getBy', 'paginationQuery', 'overview', 'collect', 'helloWord'],
})
export class TaonAnalyticsVisitorController extends TaonBaseCrudController<
  TaonAnalyticsVisitorEntity,
  {
    /* file upload query params type */
  },
  TaonAnalyticsVisitorController
> {
  entityClassResolveFn: () => typeof TaonAnalyticsVisitorEntity = () => TaonAnalyticsVisitorEntity;

  private readonly taonAnalyticsVisitorRepository = this.injectCustomRepo(TaonAnalyticsVisitorRepository);

  @GET()
  overview(): Taon.Response<TaonAnalyticsOverview> {
    //#region @websqlFunc
    return async () => this.taonAnalyticsVisitorRepository.overview();
    //#endregion
  }

  @POST({
    middlewares: ({ parentMiddlewares }) => ({
      ...parentMiddlewares,
      TaonAnalyticsMiddleware,
    }),
  })
  collect(@Body() input: TaonAnalyticsActivity): Taon.Response<TaonAnalyticsActivityResult> {
    //#region @websqlFunc
    return async req => this.taonAnalyticsVisitorRepository.collect(
      input,
      analyticsUserId('userId' in req ? req.userId : undefined),
    );
    //#endregion
  }

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
        await this.taonAnalyticsVisitorRepository.countEntitesWithEvenId();
      return `Hello ${yourName || 'world'} from ${ClassHelpers.getName(TaonAnalyticsVisitorController)}
      controller..  ${numOfEntities} entites in db..
      ${numberOfEvenEntities} entites with even ids (2,4,6,8 etc.)
      `;
    };
    //#endregion
  }
  //#endregion
}