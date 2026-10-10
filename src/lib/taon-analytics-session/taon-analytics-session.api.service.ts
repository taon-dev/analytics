//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { TaonAnalyticsSessionEntity } from './taon-analytics-session.entity';
import { TaonAnalyticsSessionController } from './taon-analytics-session.controller';
//#endregion

@Injectable()
export class TaonAnalyticsSessionApiService extends TaonBaseAngularService {
  public readonly taonAnalyticsSessionController = this.injectController(TaonAnalyticsSessionController);

  public get allMyEntities$(): Observable<TaonAnalyticsSessionEntity[]> {
    return this.taonAnalyticsSessionController.getAll().request!().observable.pipe(
      map(res => res.body?.json),
    );
  }

  public helloWorld(user: string): Observable<string> {
    return this.taonAnalyticsSessionController.helloWord(user).request!().observable.pipe(
      map(res => res.responseText as string),
    );
  }
}