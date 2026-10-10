import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'; // @browser
import { TaonAnalyticsSessionErrors } from './taon-analytics-session.constants';

export namespace TaonAnalyticsSessionValidators {
  //#region @browser
  /**
   * TODO REMOVE THIS EXAMPLE.
   */
  export const passwordMatchValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const password = control.get('password');
    const passwordRepeat = control.get('passwordRepeat');

    if (!password || !passwordRepeat) {
      return null;
    }

    return password.value === passwordRepeat.value
      ? null
      : { [TaonAnalyticsSessionErrors.INVALID_PASSWORD_EXAMPLE_ERROR]: true };
  };
  //#endregion

}