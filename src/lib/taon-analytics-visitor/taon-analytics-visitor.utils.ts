import { TaonAnalyticsVisitorModels } from './taon-analytics-visitor.models';

export namespace TaonAnalyticsVisitorUtils {
  export function isActive(state: string): state is TaonAnalyticsVisitorModels.TaonAnalyticsVisitorState {
    return state === 'active';
  }
}