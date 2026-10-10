//#region imports
import { TaonBaseRepository, TaonRepository } from 'taon/src';
import { IsNull, Raw, Repository } from 'taon-typeorm/src';
import { TaonAnalyticsSessionEntity } from '../taon-analytics-session/taon-analytics-session.entity';
import { TaonAnalyticsPageViewEntity } from '../taon-analytics-page-view/taon-analytics-page-view.entity';
import {
  ANALYTICS_SESSION_TIMEOUT_MS,
  TaonAnalyticsActivity,
  TaonAnalyticsActivityResult,
  TaonAnalyticsOverview,
} from '../taon-analytics.models';
import {
  analyticsError,
  requireAnalyticsId,
  requireAnalyticsText,
  requireAnalyticsVisitorId,
} from '../taon-analytics.validation';

import { TaonAnalyticsVisitorEntity } from './taon-analytics-visitor.entity';
//#endregion

@TaonRepository({
  className: 'TaonAnalyticsVisitorRepository',
})
export class TaonAnalyticsVisitorRepository extends TaonBaseRepository<TaonAnalyticsVisitorEntity> {
  entityClassResolveFn: () => typeof TaonAnalyticsVisitorEntity = () =>
    TaonAnalyticsVisitorEntity;

  async overview(): Promise<TaonAnalyticsOverview> {
    //#region @websqlFunc
    const [uniqueVisitors, sessions, pageViews] = await Promise.all([
      this.count(),
      this.connection.getRepository(TaonAnalyticsSessionEntity).count(),
      this.connection.getRepository(TaonAnalyticsPageViewEntity).count(),
    ]);
    return { uniqueVisitors, sessions, pageViews };
    //#endregion
  }

  async collect(
    input: TaonAnalyticsActivity,
    userId: number | null,
  ): Promise<TaonAnalyticsActivityResult> {
    //#region @websqlFunc
    if (!input || typeof input !== 'object') {
      analyticsError('Activity must be an object.');
    }
    requireAnalyticsVisitorId(input.visitorId);
    requireAnalyticsId(input.sessionId);
    requireAnalyticsId(input.pageViewId);
    requireAnalyticsText(input.path, 'path', true);
    if (!input.path.startsWith('/') || typeof input.pageView !== 'boolean') {
      analyticsError(
        'Activity requires an application path and a pageView boolean.',
      );
    }
    for (const field of [
      'title',
      'language',
      'referrer',
      'utmSource',
      'utmMedium',
      'utmCampaign',
    ] as const) {
      requireAnalyticsText(input[field], field);
    }

    return this.connection.transaction(async manager => {
      const now = new Date();
      const visitors = manager.getRepository(TaonAnalyticsVisitorEntity);
      const sessions = manager.getRepository(TaonAnalyticsSessionEntity);
      const pages = manager.getRepository(TaonAnalyticsPageViewEntity);
      await visitors
        .createQueryBuilder()
        .insert()
        .values({
          visitorId: input.visitorId,
          firstSeenAt: now,
          lastSeenAt: now,
          language: input.language ?? null,
        })
        .orIgnore()
        .execute();
      await visitors.update(
        { visitorId: input.visitorId },
        {
          lastSeenAt: now,
          ...(input.language != null ? { language: input.language } : {}),
          ...(userId != null ? { userId } : {}),
        },
      );

      let session = input.sessionId
        ? await sessions.findOne({
            where: { id: input.sessionId, visitorId: input.visitorId },
          })
        : null;
      if (
        session &&
        !session.endedAt &&
        now.getTime() - session.lastActivityAt.getTime() >=
          ANALYTICS_SESSION_TIMEOUT_MS
      ) {
        session.endedAt = session.lastActivityAt;
        session.durationSeconds = this.duration(
          session.startedAt,
          session.endedAt,
        );
        await sessions.save(session);
        // @ts-ignore
        await this.closePages(pages, session.id, session.endedAt);
      }
      const restored = !!session && !session.endedAt;
      if (!restored) {
        session = await sessions.save(
          sessions.create({
            visitorId: input.visitorId,
            startedAt: now,
            lastActivityAt: now,
            entryPath: input.path,
            exitPath: input.path,
            referrer: input.referrer ?? null,
            utmSource: input.utmSource ?? null,
            utmMedium: input.utmMedium ?? null,
            utmCampaign: input.utmCampaign ?? null,
          }),
        );
      }
      session.lastActivityAt = now;
      session.exitPath = input.path;
      session.durationSeconds = this.duration(session.startedAt, now);
      await sessions.save(session);

      let page =
        restored && input.pageViewId
          ? await pages.findOne({
              where: {
                id: input.pageViewId,
                sessionId: session.id,
                visitorId: input.visitorId,
              },
            })
          : null;
      if (input.pageView || !page || page.leftAt) {
        // @ts-ignore
        await this.closePages(pages, session.id, now);
        page = await pages.save(
          pages.create({
            sessionId: session.id,
            visitorId: input.visitorId,
            path: input.path,
            title: input.title ?? null,
            enteredAt: now,
          }),
        );
      }
      page.durationSeconds = this.duration(page.enteredAt, now);
      await pages.save(page);
      return { sessionId: session.id, pageViewId: page.id };
    });
    //#endregion
  }

  //#region @websql
  private duration(start: Date, end: Date): number {
    return Math.max(0, Math.floor((end.getTime() - start.getTime()) / 1000));
  }

  private async closePages(
    pages: Repository<TaonAnalyticsPageViewEntity>,
    sessionId: number,
    at: Date,
  ): Promise<void> {
    const openPages = await pages.find({
      // @ts-ignore
      where: { sessionId, leftAt: IsNull() },
    });
    for (const page of openPages) {
      page.leftAt = at;
      page.durationSeconds = this.duration(page.enteredAt, at);
      await pages.save(page);
    }
  }
  //#endregion

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
