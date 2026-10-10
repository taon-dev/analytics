//#region imports
import {
  Column,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
//#endregion

@TaonEntity<TaonAnalyticsPageViewEntity>({
  className: 'TaonAnalyticsPageViewEntity',
  createTable: true,
  // defaultModelMapping: () => ({
  //   '': TaonAnalyticsPageViewEntity,
  //   nestedObjectField: ClassField,
  //   nestedArrField: [ClassObjArrField],
  // }),
})
export class TaonAnalyticsPageViewEntity extends TaonBaseAbstractEntity<TaonAnalyticsPageViewEntity> {
  //#region @websql
  @Column({ type: 'integer' })
  //#endregion
  sessionId: number;

  //#region @websql
  @Column({ type: 'varchar' })
  //#endregion
  visitorId: string;

  //#region @websql
  @Column({ type: 'varchar' })
  //#endregion
  path: string;

  //#region @websql
  @Column({ type: 'text', nullable: true })
  //#endregion
  title: string | null = null;

  //#region @websql
  @Column({ type: 'datetime' })
  //#endregion
  enteredAt: Date;

  //#region @websql
  @Column({ type: 'datetime', nullable: true })
  //#endregion
  leftAt: Date | null = null;

  //#region @websql
  @Column({ type: 'integer', nullable: true })
  //#endregion
  durationSeconds: number | null = null;
}
