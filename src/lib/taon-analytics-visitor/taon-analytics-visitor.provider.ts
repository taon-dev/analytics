//#region imports
import { Taon, TaonBaseClass, TaonBaseProvider, TaonProvider } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

export class TaonTaonAnalyticsVisitorConfig extends TaonBaseClass {
  declare name: string;
}

@TaonProvider({
  className: 'TaonAnalyticsVisitorProvider',
})
export class TaonAnalyticsVisitorProvider extends TaonBaseProvider {
  enabledTaonAnalyticsVisitorOption: boolean = true;
  config = new TaonTaonAnalyticsVisitorConfig();
  clone() {
    return {
      enabledTaonAnalyticsVisitorOption: this.enabledTaonAnalyticsVisitorOption,
      config: this.config.clone(),
    };
  }
}