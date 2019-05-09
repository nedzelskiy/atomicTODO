import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';
import todosWatchers from './todos/sagas/todos.saga.watchers';
import appWatchers from '../client/containers/App/app.saga.watchers';

export default function* rootSaga() {
  try {
    const sagas = ([] as any)
      .concat(todosWatchers)
      .concat(appWatchers);
    yield all(sagas);
  } catch (e) {
    console.log('rootSaga error:', e);
    throw e;
  }
}
