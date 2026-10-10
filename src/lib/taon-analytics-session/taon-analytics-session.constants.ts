import type { TaonAnalyticsSessionEntity } from './taon-analytics-session.entity';
import { Translation } from '@taon-dev/i18n/src';
import { Taon } from 'taon/src';

const t = Translation.for(Taon.__FILE_RELATIVE_PATH, Taon.LANG_IMPORT_MAP);

export const TaonAnalyticsSessionDefaultsValues = {
  description: '',
  version: 0,
  id: void 0,
} as Partial<TaonAnalyticsSessionEntity>;

export enum TaonAnalyticsSessionErrors {
  INVALID_PASSWORD_EXAMPLE_ERROR = 'INVALID_PASSWORD_EXAMPLE_ERROR',
}

export const TaonAnalyticsSessionTranslationErorsMap = new Map([
  [TaonAnalyticsSessionErrors.INVALID_PASSWORD_EXAMPLE_ERROR, t.gettext('Invalid Password')],
]);