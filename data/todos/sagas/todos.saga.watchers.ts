import { takeEvery, select, call, put } from 'redux-saga/effects';
import sagaEvents from './todos.saga.events';
import reduxEvents from '../redux/todos.redux.events';
import { TodosReducerState } from '../../redux.reducers';
import todosStorage from '../TodosStorage/TodosLocalStorage';

function* storeTodos() {
  const state: TodosReducerState = yield select(s => s);
  yield call(todosStorage.setTodos, state.todosReducer.todos);
  yield(put({
    type: sagaEvents.ADD_TODOS_TO_STORE,
  }));
}

function* watchTodoChanges() {
  yield takeEvery(
    [
      reduxEvents.ADD_TODO,
      reduxEvents.DELETE_TODO,
      reduxEvents.TRIGGER_DONE_TODO,
    ],
    storeTodos,
  );
}

export default [
  watchTodoChanges(),
];
