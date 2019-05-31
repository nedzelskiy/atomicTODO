import * as clone from 'clone';
import events from './app.redux.events';
import { CommonAction } from '../../../data/redux.interfaces';
import initialState, { State, CurrentRoute, PageError } from './app.redux.initial-state';

export default (state: State = initialState, action: CommonAction): State => {
  const newState: State = clone(state);

  switch (action.type) {
    case events.APP__SET_CURRENT_ROUTE: {
      const { route } = <SetRoutePayload>action.payload;
      newState.route = route;
      break;
    }

    case events.APP__SET_LOCALE: {
      const { locale } = <SetLocalePayload>action.payload;
      newState.locale = locale;
      break;
    }

    case events.APP__START_LOADING: {
      const { id } = <StartLoadingPayload>action.payload;
      newState.loading[id] = id;
      break;
    }

    case events.APP__STOP_LOADING: {
      const { id } = <StopLoadingPayload>action.payload;
      delete newState.loading[id];
      break;
    }

    case events.APP__SET_PAGE_ERROR: {
      const { error } = <SetPageErrorPayload>action.payload;
      newState.pageError = error;
      break;
    }

    case events.APP__CLEAR_PAGE_ERROR: {
      newState.pageError = initialState.pageError;
      break;
    }
  }

  return newState;
};

interface StartLoadingPayload {
  id: string;
}

interface StopLoadingPayload {
  id: string;
}

interface SetRoutePayload {
  route: CurrentRoute;
}

interface SetPageErrorPayload {
  error: PageError;
}

interface SetLocalePayload {
  locale: string;
}
