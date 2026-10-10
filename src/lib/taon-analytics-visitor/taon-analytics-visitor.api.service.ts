//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { TaonAnalyticsVisitorEntity } from './taon-analytics-visitor.entity';
import { TaonAnalyticsVisitorController } from './taon-analytics-visitor.controller';
import { TaonAnalyticsOverview } from '../taon-analytics.models';
//#endregion

@Injectable()
export class TaonAnalyticsVisitorApiService extends TaonBaseAngularService {
  public readonly taonAnalyticsVisitorController = this.injectController(TaonAnalyticsVisitorController);

  public overview(): Observable<TaonAnalyticsOverview> {
    return this.taonAnalyticsVisitorController.overview().request!().observable.pipe(
      map(res => res.body.json),
    );
  }

  public get allMyEntities$(): Observable<TaonAnalyticsVisitorEntity[]> {
    return this.taonAnalyticsVisitorController.getAll().request!().observable.pipe(
      map(res => res.body?.json),
    );
  }

  public helloWorld(user: string): Observable<string> {
    return this.taonAnalyticsVisitorController.helloWord(user).request!().observable.pipe(
      map(res => res.responseText as string),
    );
  }
}