import type { TaonAnalyticsVisitorEntity } from './taon-analytics-visitor.entity';
import { Translation } from '@taon-dev/i18n/src';
import { Taon } from 'taon/src';

const t = Translation.for(Taon.__FILE_RELATIVE_PATH, Taon.LANG_IMPORT_MAP);

export const TaonAnalyticsVisitorDefaultsValues = {
  description: '',
  version: 0,
  id: void 0,
} as Partial<TaonAnalyticsVisitorEntity>;

export enum TaonAnalyticsVisitorErrors {
  INVALID_PASSWORD_EXAMPLE_ERROR = 'INVALID_PASSWORD_EXAMPLE_ERROR',
}

export const TaonAnalyticsVisitorTranslationErorsMap = new Map([
  [TaonAnalyticsVisitorErrors.INVALID_PASSWORD_EXAMPLE_ERROR, t.gettext('Invalid Password')],
]);