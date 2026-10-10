import { TaonAnalyticsPageViewModels } from './taon-analytics-page-view.models';

export namespace TaonAnalyticsPageViewUtils {
  export function isActive(state: string): state is TaonAnalyticsPageViewModels.TaonAnalyticsPageViewState {
    return state === 'active';
  }
}