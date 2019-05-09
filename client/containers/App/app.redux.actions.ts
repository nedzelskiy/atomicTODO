import events from './app.redux.events';
import { CurrentRoute } from './app.redux.initial-state';
import { CommonAction } from '../../../data/redux.interfaces';

interface StorePageParamsAction {
  type: events.APP__STORE_PAGE_PARAMS;
  payload: {
    route: CurrentRoute;
    history: History | {};
  };
}

export interface StorePageParams {
  (route: CurrentRoute, history: History | {}): CommonAction & StorePageParamsAction;
}

export const storePageParams: StorePageParams = (
  route: CurrentRoute,
  history: History | {},
): StorePageParamsAction => {
  return {
    type: events.APP__STORE_PAGE_PARAMS,
    payload: {
      route,
      history,
    },
  };
};

export interface ChangeLocaleAction {
  type: events.APP__CHANGE_LOCALE;
  payload: {
    locale: string;
  };
}

export interface ChangeLocale {
  (locale: string): CommonAction & ChangeLocaleAction;
}

export const changeLocale: ChangeLocale = (locale: string): ChangeLocaleAction => {
  return {
    type: events.APP__CHANGE_LOCALE,
    payload: {
      locale,
    },
  };
};