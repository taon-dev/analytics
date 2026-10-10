//#region imports
import { TaonBaseRepository, TaonRepository } from 'taon/src';
import { Raw } from 'taon-typeorm/src';

import { TaonAnalyticsEventEntity } from './taon-analytics-event.entity';
import { TaonAnalyticsSessionEntity } from '../taon-analytics-session/taon-analytics-session.entity';
import { TaonAnalyticsEventInput } from '../taon-analytics.models';
import {
  analyticsError,
  requireAnalyticsId,
  requireAnalyticsText,
  requireAnalyticsVisitorId,
} from '../taon-analytics.validation';
//#endregion

@TaonRepository({
  className: 'TaonAnalyticsEventRepository',
})
export class TaonAnalyticsEventRepository extends TaonBaseRepository<TaonAnalyticsEventEntity> {
  entityClassResolveFn: () => typeof TaonAnalyticsEventEntity = () => TaonAnalyticsEventEntity;

  async record(
    input: TaonAnalyticsEventInput,
    userId: number | null = null,
  ): Promise<TaonAnalyticsEventEntity> {
    //#region @websqlFunc
    if (!input || typeof input !== 'object') {
      analyticsError('Event must be an object.');
    }
    requireAnalyticsText(input.name, 'name', true);
    requireAnalyticsText(input.category, 'category');
    requireAnalyticsText(input.path, 'path');
    requireAnalyticsId(input.sessionId);
    if (input.visitorId != null) {
      requireAnalyticsVisitorId(input.visitorId);
    }
    if (input.data != null &&
        (typeof input.data !== 'object' || Array.isArray(input.data))) {
      analyticsError('Event data must be a JSON object.');
    }
    if (input.sessionId != null) {
      const session = await this.connection.getRepository(TaonAnalyticsSessionEntity)
        .findOne({ where: { id: input.sessionId } });
      if (!session || (input.visitorId != null && session.visitorId !== input.visitorId)) {
        analyticsError('Event session does not belong to this visitor.');
      }
    }
    const events = this.connection.getRepository(TaonAnalyticsEventEntity);
    return events.save(events.create({
      name: input.name,
      sessionId: input.sessionId ?? null,
      visitorId: input.visitorId ?? null,
      userId,
      category: input.category ?? null,
      path: input.path ?? null,
      data: input.data ?? null,
      createdAt: new Date(),
    }));
    //#endregion
  }

  /**
   * TODO remove this demo example method
   */
  async countEntitesWithEvenId(): Promise<number> {
    //#region @websqlFunc
    const result = await this.count({
      where: {
        id: Raw(alias => `${alias} % 2 = 0`),
      },
    });
    return result;
    //#endregion
  }
}