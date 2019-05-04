import { combineReducers, ReducersMapObject } from 'redux';
import todos from './todos/redux/todos.redux.reducer';
import { State as TodosState } from './todos/redux/todos.redux.initial-state';

export interface TodosReducersState {
  todos: TodosState;
}

export type StateOfReducers = TodosReducersState;

const reducers: ReducersMapObject<StateOfReducers> = {
  todos,
};

export default combineReducers(reducers);
