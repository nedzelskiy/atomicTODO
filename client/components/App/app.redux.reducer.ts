import { cloneDeep } from 'lodash';
import * as constants from './app.redux.constants';
import initialState, { State } from './app.redux.initial-state';
import { TranslationsForLocale, Action as CommonAction } from '../../../common/interfaces';

export interface AddTranslationPayload {
  locale: string;
  translationsForLocale: TranslationsForLocale;
}

export default (state: State = initialState, action: CommonAction): State => {
  const newState: State = cloneDeep(state);
  switch (action.type) {
    case constants.APP__ADD_TRANSLATIONS: {
      const { locale, translationsForLocale } = <AddTranslationPayload>action.payload;
      break;
    }

    default:
      break;
  }
  return newState;
};
