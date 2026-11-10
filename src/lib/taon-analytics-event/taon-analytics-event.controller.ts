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
import { TaonAnalyticsEventInput } from '../taon-analytics.models';
import { analyticsUserId } from '../taon-analytics.validation';

import { TaonAnalyticsEventEntity } from './taon-analytics-event.entity';
import { TaonAnalyticsEventRepository } from './taon-analytics-event.repository';
//#endregion

@TaonController<TaonAnalyticsEventController>({
  className: 'TaonAnalyticsEventController',
  allowedMethods: ['getAll', 'getBy', 'paginationQuery', 'record'],
})
export class TaonAnalyticsEventController extends TaonBaseCrudController<TaonAnalyticsEventEntity> {
  entityClassResolveFn: () => typeof TaonAnalyticsEventEntity = () =>
    TaonAnalyticsEventEntity;

  taonAnalyticsEventRepository = this.injectCustomRepo(
    TaonAnalyticsEventRepository,
  );

  @POST()
  record(
    @Body() input: TaonAnalyticsEventInput,
  ): Taon.Response<TaonAnalyticsEventEntity> {
    //#region @websqlFunc
    return async req =>
      this.taonAnalyticsEventRepository.record(
        input,
        analyticsUserId('userId' in req ? req.userId : undefined),
      );
    //#endregion
  }
}
