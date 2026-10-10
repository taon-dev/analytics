import type { TaonAnalyticsPageViewEntity } from './taon-analytics-page-view.entity';
import { Translation } from '@taon-dev/i18n/src';
import { Taon } from 'taon/src';

const t = Translation.for(Taon.__FILE_RELATIVE_PATH, Taon.LANG_IMPORT_MAP);

export const TaonAnalyticsPageViewDefaultsValues = {
  description: '',
  version: 0,
  id: void 0,
} as Partial<TaonAnalyticsPageViewEntity>;

export enum TaonAnalyticsPageViewErrors {
  INVALID_PASSWORD_EXAMPLE_ERROR = 'INVALID_PASSWORD_EXAMPLE_ERROR',
}

export const TaonAnalyticsPageViewTranslationErorsMap = new Map([
  [TaonAnalyticsPageViewErrors.INVALID_PASSWORD_EXAMPLE_ERROR, t.gettext('Invalid Password')],
]);