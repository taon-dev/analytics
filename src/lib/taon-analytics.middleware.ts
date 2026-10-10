import {
  TaonBaseMiddleware,
  TaonMiddleware,
  TaonServerMiddlewareInterceptOptions,
} from 'taon/src';
import {
  TaonSessionKvRepository,
  TaonSessionRepository,
} from '@taon-dev/session/src';

@TaonMiddleware({ className: 'TaonAnalyticsMiddleware' })
export class TaonAnalyticsMiddleware extends TaonBaseMiddleware {
  private readonly sessions = this.injectCustomRepo(TaonSessionRepository);

  private readonly tokens = this.injectKvRepository(TaonSessionKvRepository);

  async interceptServerMethod(
    data: TaonServerMiddlewareInterceptOptions,
  ): Promise<void> {
    //#region @websqlFunc
    if (this.tokens.getTokenFromRequest(data.req)) {
      await this.sessions.throwIfNotAuthenticated(data);
    }
    //#endregion
  }
}
