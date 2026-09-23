//#region imports
import {
  CustomColumn, Column,
  Taon,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonAnalyticsEventDefaultsValues } from './taon-analytics-event.constants';
//#endregion

@TaonEntity({
  className: 'TaonAnalyticsEventEntity',
  createTable: true,
})
export class TaonAnalyticsEventEntity extends TaonBaseAbstractEntity<TaonAnalyticsEventEntity> {
  //#region @websql
  @CustomColumn({
    type: 'varchar',
    length: 100,
    default: TaonAnalyticsEventDefaultsValues.description,
  })
  //#endregion
  description?: string;
}