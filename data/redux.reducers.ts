import { combineReducers, ReducersMapObject } from 'redux';
import todosReducer from './todos/redux/todos.redux.reducer';
import { State as TodosState } from './todos/redux/todos.redux.initial-state';

export interface TodosReducersState {
  todosReducer: TodosState;
}

export type StateOfReducers = TodosReducersState;

const reducers: ReducersMapObject<StateOfReducers> = {
  todosReducer,
};

export default combineReducers(reducers);
