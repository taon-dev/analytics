//#region imports
import { Taon, TaonBaseClass, TaonBaseProvider, TaonProvider } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

export class TaonTaonAnalyticsSessionConfig extends TaonBaseClass {
  declare name: string;
}

@TaonProvider({
  className: 'TaonAnalyticsSessionProvider',
})
export class TaonAnalyticsSessionProvider extends TaonBaseProvider {
  enabledTaonAnalyticsSessionOption: boolean = true;
  config = new TaonTaonAnalyticsSessionConfig();
  clone() {
    return {
      enabledTaonAnalyticsSessionOption: this.enabledTaonAnalyticsSessionOption,
      config: this.config.clone(),
    };
  }
}