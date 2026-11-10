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
export class TaonAnalyticsMiddleware extends TaonBaseMiddleware {}
