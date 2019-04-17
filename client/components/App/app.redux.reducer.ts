import { cloneDeep } from 'lodash';
import * as constants from './app.redux.constants';
import initialState, { State, I18nValue } from './app.redux.initial-state';

export interface Action {
  type: string;
  payload: {
    locale?: string;
    translations?: I18nValue;
  };
}

export default (state: State = initialState, action: Action): State => {
  const newState: State = cloneDeep(state);
  switch (action.type) {
    case constants.APP__ADD_TRANSLATIONS: {
      const { locale, translations } = action.payload;
      if (locale && translations) {
        newState.i18n.set(locale, translations);
      }
      break;
    }

    default:
      break;
  }
  return newState;
};
