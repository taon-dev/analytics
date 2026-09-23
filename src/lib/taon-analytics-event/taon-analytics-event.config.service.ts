//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import { TaonAnalyticsEventProvider } from './taon-analytics-event.provider';
//#endregion

@Injectable()
export class TaonAnalyticsEventConfigService extends TaonBaseAngularService {
  private taonAnalyticsEventProvider = this.injectProvider(TaonAnalyticsEventProvider);

  get isEnableOption() {
    return this.taonAnalyticsEventProvider.enabledTaonAnalyticsEventOption;
  }
}