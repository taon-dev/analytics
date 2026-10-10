//#region imports
import {
  Column,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
//#endregion

@TaonEntity<TaonAnalyticsVisitorEntity>({
  className: 'TaonAnalyticsVisitorEntity',
  createTable: true,
  // defaultModelMapping: () => ({
  //   '': TaonAnalyticsVisitorEntity,
  //   nestedObjectField: ClassField,
  //   nestedArrField: [ClassObjArrField],
  // }),
})
export class TaonAnalyticsVisitorEntity extends TaonBaseAbstractEntity<TaonAnalyticsVisitorEntity> {
  //#region @websql
  @Column({ type: 'varchar', unique: true })
  //#endregion
  visitorId: string;

  //#region @websql
  @Column({ type: 'integer', nullable: true })
  //#endregion
  userId: number | null = null;

  //#region @websql
  @Column({ type: 'datetime' })
  //#endregion
  firstSeenAt: Date;

  //#region @websql
  @Column({ type: 'datetime' })
  //#endregion
  lastSeenAt: Date;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  language: string | null = null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  deviceType: string | null = null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  browser: string | null = null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  os: string | null = null;
}
