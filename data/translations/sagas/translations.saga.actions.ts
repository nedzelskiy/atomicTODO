import events from './translations.saga.events';
import { CommonAction } from '../../redux.interfaces';

export interface GetTranslationsAction {
  type: events.TRANSLATONS__GET_TRANSLATION;
  payload: {
    locale: string;
  };
}

export interface GetTranslations {
  (locale: string): CommonAction & GetTranslationsAction;
}

export const getTranslations:GetTranslations = (locale: string): GetTranslationsAction => {
  return {
    type: events.TRANSLATONS__GET_TRANSLATION,
    payload: {
      locale,
    },
  };
};
