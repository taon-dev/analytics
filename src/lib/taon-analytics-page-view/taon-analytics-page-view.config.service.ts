//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import { TaonAnalyticsPageViewProvider } from './taon-analytics-page-view.provider';
//#endregion

@Injectable()
export class TaonAnalyticsPageViewConfigService extends TaonBaseAngularService {
  private taonAnalyticsPageViewProvider = this.injectProvider(TaonAnalyticsPageViewProvider);

  get isEnableOption() {
    return this.taonAnalyticsPageViewProvider.enabledTaonAnalyticsPageViewOption;
  }

  clone(): Partial<TaonAnalyticsPageViewProvider> {
    const cloned = this.taonAnalyticsPageViewProvider.clone();
    return cloned;
  }
}