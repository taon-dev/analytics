//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import { TaonAnalyticsSessionProvider } from './taon-analytics-session.provider';
//#endregion

@Injectable()
export class TaonAnalyticsSessionConfigService extends TaonBaseAngularService {
  private taonAnalyticsSessionProvider = this.injectProvider(TaonAnalyticsSessionProvider);

  get isEnableOption() {
    return this.taonAnalyticsSessionProvider.enabledTaonAnalyticsSessionOption;
  }

  clone(): Partial<TaonAnalyticsSessionProvider> {
    const cloned = this.taonAnalyticsSessionProvider.clone();
    return cloned;
  }
}