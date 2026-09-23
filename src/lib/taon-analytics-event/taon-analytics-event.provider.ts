//#region imports
import { Taon, TaonBaseProvider, TaonProvider } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

@TaonProvider({
  className: 'TaonAnalyticsEventProvider',
})
export class TaonAnalyticsEventProvider extends TaonBaseProvider {
  enabledTaonAnalyticsEventOption: boolean = true;
}