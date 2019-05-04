import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../data/redux.reducers';

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);
  const configuredState = initialState;
  let enhancer = middleware;
  if (
    typeof window === 'object'
    && typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined'
  ) {
    enhancer = compose(middleware, (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());
  }
  return createStore(reducers, configuredState, enhancer);
}
