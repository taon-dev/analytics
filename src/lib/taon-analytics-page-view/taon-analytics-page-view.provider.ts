//#region imports
import { Taon, TaonBaseClass, TaonBaseProvider, TaonProvider } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

export class TaonTaonAnalyticsPageViewConfig extends TaonBaseClass {
  declare name: string;
}

@TaonProvider({
  className: 'TaonAnalyticsPageViewProvider',
})
export class TaonAnalyticsPageViewProvider extends TaonBaseProvider {
  enabledTaonAnalyticsPageViewOption: boolean = true;
  config = new TaonTaonAnalyticsPageViewConfig();
  clone() {
    return {
      enabledTaonAnalyticsPageViewOption: this.enabledTaonAnalyticsPageViewOption,
      config: this.config.clone(),
    };
  }
}