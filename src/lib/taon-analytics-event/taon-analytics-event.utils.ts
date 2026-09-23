import { TaonAnalyticsEventModels } from './taon-analytics-event.models';

export namespace TaonAnalyticsEventUtils {
  export function isActive(state: string): state is TaonAnalyticsEventModels.TaonAnalyticsEventState {
    return state === 'active';
  }
}