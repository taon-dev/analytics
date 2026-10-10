//#region imports
import {
  Column,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
//#endregion

@TaonEntity<TaonAnalyticsSessionEntity>({
  className: 'TaonAnalyticsSessionEntity',
  createTable: true,
  // defaultModelMapping: () => ({
  //   '': TaonAnalyticsSessionEntity,
  //   nestedObjectField: ClassField,
  //   nestedArrField: [ClassObjArrField],
  // }),
})
export class TaonAnalyticsSessionEntity extends TaonBaseAbstractEntity<TaonAnalyticsSessionEntity> {
  //#region @websql
  @Column({ type: 'varchar' })
  //#endregion
  visitorId: string;

  //#region @websql
  @Column({ type: 'datetime' })
  //#endregion
  startedAt: Date;

  //#region @websql
  @Column({ type: 'datetime' })
  //#endregion
  lastActivityAt: Date;

  //#region @websql
  @Column({ type: 'datetime', nullable: true })
  //#endregion
  endedAt: Date | null = null;

  //#region @websql
  @Column({ type: 'integer', nullable: true })
  //#endregion
  durationSeconds: number | null = null;

  //#region @websql
  @Column({ type: 'varchar' })
  //#endregion
  entryPath: string;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  exitPath: string | null = null;

  //#region @websql
  @Column({ type: 'text', nullable: true })
  //#endregion
  referrer: string | null = null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  utmSource: string | null = null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  utmMedium: string | null = null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  utmCampaign: string | null = null;
}
