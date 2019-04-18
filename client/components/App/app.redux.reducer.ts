import { cloneDeep } from 'lodash';
import * as constants from './app.redux.constants';
import initialState, { State } from './app.redux.initial-state';
import { I18n, Action as CommonAction } from '../../../common/interfaces';

export interface AddTranslationPayload {
  locale: string;
  translations: I18n;
}

export default (state: State = initialState, action: CommonAction): State => {
  const newState: State = cloneDeep(state);
  switch (action.type) {
    case constants.APP__ADD_TRANSLATIONS: {
      const { locale, translations } = <AddTranslationPayload>action.payload;
      newState.i18n[locale] = translations;
      break;
    }

    default:
      break;
  }
  return newState;
};
