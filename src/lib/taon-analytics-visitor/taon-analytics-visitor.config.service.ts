//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import { TaonAnalyticsVisitorProvider } from './taon-analytics-visitor.provider';
//#endregion

@Injectable()
export class TaonAnalyticsVisitorConfigService extends TaonBaseAngularService {
  private taonAnalyticsVisitorProvider = this.injectProvider(TaonAnalyticsVisitorProvider);

  get isEnableOption() {
    return this.taonAnalyticsVisitorProvider.enabledTaonAnalyticsVisitorOption;
  }

  clone(): Partial<TaonAnalyticsVisitorProvider> {
    const cloned = this.taonAnalyticsVisitorProvider.clone();
    return cloned;
  }
}