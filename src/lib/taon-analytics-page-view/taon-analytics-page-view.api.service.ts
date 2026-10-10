//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { TaonAnalyticsPageViewEntity } from './taon-analytics-page-view.entity';
import { TaonAnalyticsPageViewController } from './taon-analytics-page-view.controller';
//#endregion

@Injectable()
export class TaonAnalyticsPageViewApiService extends TaonBaseAngularService {
  public readonly taonAnalyticsPageViewController = this.injectController(TaonAnalyticsPageViewController);

  public get allMyEntities$(): Observable<TaonAnalyticsPageViewEntity[]> {
    return this.taonAnalyticsPageViewController.getAll().request!().observable.pipe(
      map(res => res.body?.json),
    );
  }

  public helloWorld(user: string): Observable<string> {
    return this.taonAnalyticsPageViewController.helloWord(user).request!().observable.pipe(
      map(res => res.responseText as string),
    );
  }
}