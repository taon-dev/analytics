import { TaonAnalyticsSessionModels } from './taon-analytics-session.models';

export namespace TaonAnalyticsSessionUtils {
  export function isActive(state: string): state is TaonAnalyticsSessionModels.TaonAnalyticsSessionState {
    return state === 'active';
  }
}