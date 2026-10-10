//#region imports
import { Taon, TaonBaseMiddleware, TaonMiddleware } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

@TaonMiddleware({
  className: 'TaonAnalyticsVisitorMiddleware',
})
export class TaonAnalyticsVisitorMiddleware extends TaonBaseMiddleware {}