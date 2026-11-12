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
  HttpStatusEnum,
  getStatusCode,
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

  private readonly taonAnalyticsVisitorRepository = this.inject(
    TaonAnalyticsVisitorRepository,
  );

  taonSessionRepository = this.inject(TaonSessionRepository);

  taonAuthContextRepository = this.inject(TaonAuthContextRepository);

  protected async beforeEachRequest({
    req,
    res,
    methodConfig,
    t,
  }: Models.TaonCtrlBeforeEachRequestParams<TaonAnalyticsVisitorController>): Promise<void> {
    //#region @websqlFunc
    if (methodConfig.methodName === 'collect') {
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
