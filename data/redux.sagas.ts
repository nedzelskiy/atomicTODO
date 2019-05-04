import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';
import todosWatchers from './todos/redux/todos.sagas';

export default function* rootSaga() {
  try {
    const sagas = ([] as any)
      .concat(todosWatchers);
    yield all(sagas);
  } catch (e) {
    console.log('rootSaga error:', e);
    throw e;
  }
}
