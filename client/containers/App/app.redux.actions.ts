import events from './app.redux.events';
import { CurrentRoute, PageError } from './app.redux.initial-state';

interface SetCurrentRouteAction {
  type: events.APP__SET_CURRENT_ROUTE;
  payload: {
    route: CurrentRoute;
  };
}

export interface SetCurrentRoute {
  (route: CurrentRoute): SetCurrentRouteAction;
}

export const setCurrentRoute: SetCurrentRoute = (route: CurrentRoute): SetCurrentRouteAction => {
  return {
    type: events.APP__SET_CURRENT_ROUTE,
    payload: {
      route,
    },
  };
};

export interface SetLocaleAction {
  type: events.APP__SET_LOCALE;
  payload: {
    locale: string;
  };
}

export interface SetLocale {
  (locale: string): SetLocaleAction;
}

export const setLocale: SetLocale = (locale: string): SetLocaleAction => {
  return {
    type: events.APP__SET_LOCALE,
    payload: {
      locale,
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
  (locale: string): ChangeLocaleAction;
}

export const changeLocale: ChangeLocale = (locale: string): ChangeLocaleAction => {
  return {
    type: events.APP__CHANGE_LOCALE,
    payload: {
      locale,
    },
  };
};

export interface StartLoading {
  (): {
    type: events.APP__START_LOADING;
  };
}

export const startLoading: StartLoading = () => {
  return {
    type: events.APP__START_LOADING,
  };
};

export interface StopLoading {
  (): {
    type: events.APP__STOP_LOADING;
  };
}

export const stopLoading: StopLoading = () => {
  return {
    type: events.APP__STOP_LOADING,
  };
};

export interface SetPageErrorAction {
  type: events.APP__SET_PAGE_ERROR;
  payload: {
    error: PageError;
  };
}

export interface SetPageError {
  (error: PageError): SetPageErrorAction;
}

const setPageError: SetPageError = (error: PageError): SetPageErrorAction => {
  return {
    type: events.APP__SET_PAGE_ERROR,
    payload: {
      error,
    },
  };
};

export interface ClearPageError {
  (): {
    type: events.APP__CLEAR_PAGE_ERROR;
  };
}

export const clearPageError: ClearPageError = () => {
  return {
    type: events.APP__CLEAR_PAGE_ERROR,
  };
};
