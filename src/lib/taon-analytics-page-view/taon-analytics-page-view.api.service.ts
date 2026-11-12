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
  protected readonly taonAnalyticsPageViewController = this.inject(TaonAnalyticsPageViewController);


}
