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

export interface GetLocaleAction {
  type: events.APP__GET_LOCALE;
  payload: {
    locale: string;
  };
}

export interface GetLocale {
  (locale: string): GetLocaleAction;
}

export const getLocale: GetLocale = (locale: string): GetLocaleAction => {
  return {
    type: events.APP__GET_LOCALE,
    payload: {
      locale,
    },
  };
};

export interface StartLoading {
  (id: string): {
    type: events.APP__START_LOADING;
    payload: {
      id: string;
    };
  };
}

export const startLoading: StartLoading = (id: string) => {
  return {
    type: events.APP__START_LOADING,
    payload: {
      id,
    },
  };
};

export interface StopLoading {
  (id: string): {
    type: events.APP__STOP_LOADING;
    payload: {
      id: string;
    };
  };
}

export const stopLoading: StopLoading = (id: string) => {
  return {
    type: events.APP__STOP_LOADING,
    payload: {
      id,
    },
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

export const setPageError: SetPageError = (error: PageError): SetPageErrorAction => {
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
