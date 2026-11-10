//#region imports
import { TaonAuthContextRepository } from '@taon-dev/e-commerce/src';
import {
  TaonSessionCoreGroups,
  TaonSessionRepository,
} from '@taon-dev/session/src';
import {
  Taon,
  ClassHelpers,
  TaonController,
  TaonBaseCrudController,
  Query,
  GET,
  POST,
  Body,
  Models,
  getStatusCode,
  HttpStatusEnum,
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

  taonSessionRepository = this.injectCustomRepo(TaonSessionRepository);

  taonAuthContextRepository = this.injectCustomRepo(TaonAuthContextRepository);

  protected async beforeEachRequest({
    req,
    res,
    methodConfig,
    t,
  }: Models.TaonCtrlBeforeEachRequestParams<TaonAnalyticsEventController>): Promise<void> {
    //#region @websqlFunc
    if (methodConfig.methodName === 'record') {
      return;
    }
    await this.taonSessionRepository.throwIfNotAuthenticated({ req, res });
    const context = await this.taonAuthContextRepository.getContext(
      req.userId,
      req.sessionId,
    );
    if (context?.hasAccess?.toManageAnalytics) {
      // ok
    } else {
      Taon.error({
        message: t.gettext(
          'Administrator access is required for analytics management.',
        ),
        status: getStatusCode(HttpStatusEnum.FORBIDDEN),
      });
    }
    //#endregion
  }

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
