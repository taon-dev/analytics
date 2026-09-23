//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { TaonAnalyticsEventEntity } from './taon-analytics-event.entity';
import { TaonAnalyticsEventController } from './taon-analytics-event.controller';
//#endregion

@Injectable()
export class TaonAnalyticsEventApiService extends TaonBaseAngularService {
  private taonAnalyticsEventController = this.injectController(TaonAnalyticsEventController);

  public get allMyEntities$(): Observable<TaonAnalyticsEventEntity[]> {
    return this.taonAnalyticsEventController.getAll().request!().observable.pipe(
      map(res => res.body?.json),
    );
  }

  public helloWorld(user: string): Observable<string> {
    return this.taonAnalyticsEventController.helloWord(user).request!().observable.pipe(
      map(res => res.responseText as string),
    );
  }
}