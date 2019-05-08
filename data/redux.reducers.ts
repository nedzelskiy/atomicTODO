import { combineReducers, ReducersMapObject } from 'redux';
import todosReducer from './todos/redux/todos.redux.reducer';
import { State as TodosState } from './todos/redux/todos.redux.initial-state';

export interface TodosReducerState {
  todosReducer: TodosState;
}

export type StateOfReducers = TodosReducerState;

const reducers: ReducersMapObject<StateOfReducers> = {
  todosReducer,
};

export default combineReducers(reducers);
