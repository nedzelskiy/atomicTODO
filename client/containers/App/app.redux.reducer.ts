import { cloneDeep } from 'lodash';
import events from './app.redux.events';
import initialState , { State, CurrentRoute } from './app.redux.initial-state';
import { CommonAction } from '../../../data/redux.interfaces';

export default (state: State = initialState, action: CommonAction): State => {
  const newState: State = cloneDeep(state);

  switch (action.type) {
    case events.APP__STORE_PAGE_PARAMS: {
      const { route, history } = <SetRoutePayload>action.payload;
      newState.route = route;
      newState.history = history;
    }
  }

  return newState;
};

interface SetRoutePayload {
  route: CurrentRoute;
  history: History | {};
}
