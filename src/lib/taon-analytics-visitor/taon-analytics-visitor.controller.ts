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

import { TaonAnalyticsMiddleware } from '../taon-analytics.middleware';
import {
  TaonAnalyticsActivity,
  TaonAnalyticsActivityResult,
  TaonAnalyticsOverview,
} from '../taon-analytics.models';
import { analyticsUserId } from '../taon-analytics.validation';

import { TaonAnalyticsVisitorEntity } from './taon-analytics-visitor.entity';
import { TaonAnalyticsVisitorRepository } from './taon-analytics-visitor.repository';

//#endregion

@TaonController<TaonAnalyticsVisitorController>({
  className: 'TaonAnalyticsVisitorController',
  allowedMethods: ['getAll', 'getBy', 'paginationQuery', 'overview', 'collect'],
})
export class TaonAnalyticsVisitorController extends TaonBaseCrudController<
  TaonAnalyticsVisitorEntity,
  {
    /* file upload query params type */
  },
  TaonAnalyticsVisitorController
> {
  entityClassResolveFn: () => typeof TaonAnalyticsVisitorEntity = () =>
    TaonAnalyticsVisitorEntity;

  private readonly taonAnalyticsVisitorRepository = this.injectCustomRepo(
    TaonAnalyticsVisitorRepository,
  );

  @GET()
  overview(): Taon.Response<TaonAnalyticsOverview> {
    //#region @websqlFunc
    return async () => this.taonAnalyticsVisitorRepository.overview();
    //#endregion
  }

  @POST()
  collect(
    @Body() input: TaonAnalyticsActivity,
  ): Taon.Response<TaonAnalyticsActivityResult> {
    //#region @websqlFunc
    return async req => {
      return await this.taonAnalyticsVisitorRepository.collect(
        input,
        analyticsUserId('userId' in req ? req.userId : undefined),
      );
    };
    //#endregion
  }
}
