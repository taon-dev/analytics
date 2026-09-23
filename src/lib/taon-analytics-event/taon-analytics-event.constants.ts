import type { TaonAnalyticsEventEntity } from './taon-analytics-event.entity';
import { Translation } from '@taon-dev/i18n/src';
import { Taon } from 'taon/src';

const t = Translation.for(Taon.__FILE_RELATIVE_PATH, Taon.LANG_IMPORT_MAP);

export const TaonAnalyticsEventDefaultsValues = {
  description: '',
  version: 0,
  id: void 0,
} as Partial<TaonAnalyticsEventEntity>;

export enum TaonAnalyticsEventErrors {
  INVALID_PASSWORD_EXAMPLE_ERROR = 'INVALID_PASSWORD_EXAMPLE_ERROR',
}

export const TaonAnalyticsEventTranslationErorsMap = new Map([
  [TaonAnalyticsEventErrors.INVALID_PASSWORD_EXAMPLE_ERROR, t.gettext('Invalid Password')],
]);