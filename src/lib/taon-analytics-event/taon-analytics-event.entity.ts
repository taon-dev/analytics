//#region imports
import {
  Column,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
//#endregion

@TaonEntity({
  className: 'TaonAnalyticsEventEntity',
  createTable: true,
})
export class TaonAnalyticsEventEntity extends TaonBaseAbstractEntity<TaonAnalyticsEventEntity> {
  //#region @websql
  @Column({ type: 'integer', nullable: true })
  //#endregion
  sessionId: number | null = null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  visitorId: string | null = null;

  //#region @websql
  @Column({ type: 'integer', nullable: true })
  //#endregion
  userId: number | null = null;

  //#region @websql
  @Column({ type: 'varchar' })
  //#endregion
  name: string;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  category: string | null = null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  path: string | null = null;

  //#region @websql
  @Column({ type: 'simple-json', nullable: true })
  //#endregion
  data: Record<string, unknown> | null = null;

  //#region @websql
  @Column({ type: 'datetime' })
  //#endregion
  createdAt: Date;
}
