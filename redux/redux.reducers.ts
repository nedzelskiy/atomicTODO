import { combineReducers } from 'redux';

import todos from './todos/todos.redux.reducer';

export default combineReducers({
  todos,
});
