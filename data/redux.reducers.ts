import { combineReducers, ReducersMapObject } from 'redux';
import todosReducer from './todos/redux/todos.redux.reducer';
import { State as TodosState } from './todos/redux/todos.redux.initial-state';
import appReducer from '../client/containers/App/app.redux.reducer';
import { State as AppState } from '../client/containers/App/app.redux.initial-state';

export interface TodosReducerState {
  todosReducer: TodosState;
}
export interface AppReducerState {
  appReducer: AppState;
}

export type StateOfReducers = TodosReducerState & AppReducerState;

const reducers: ReducersMapObject<StateOfReducers> = {
  appReducer,
  todosReducer,
};

export default combineReducers(reducers);
