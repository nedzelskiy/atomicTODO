import { cloneDeep } from 'lodash';
import * as constants from './todolist.redux.constants';
import initialState, { State, Todo } from './todolist.redux.initial-state';
import { Action as CommonAction } from '../../../../common/interfaces';

export default (state: State = initialState, action: CommonAction): State => {
  const newState: State = cloneDeep(state);
  switch (action.type) {
    case constants.TODO_LIST__ADD_TODOS: {
      const { todos } = <AddTodosPayload>action.payload;
      newState.todos = todos;
      break;
    }

    case constants.TODO_LIST__ADD_TODO: {
      const { todo } = <AddTodoPayload>action.payload;
      newState.todos.push(todo);
      break;
    }

    case constants.TODO_LIST__DELETE_TODO: {
      const { id } = <DeleteTodoPayload>action.payload;
      const newTodos: Todo[] = [];
      newState.todos.forEach((todo) => {
        if (todo.id !== id) {
          newTodos.push(todo);
        }
      });
      newState.todos = newTodos;
      break;
    }

    case constants.TODO_LIST__TRIGGER_DONE_TODO: {
      const { id } = <TriggerDoneTodoPayload>action.payload;
      newState.todos.find((todo, index) => {
        if (todo.id === id) {
          newState.todos[index].isDone = !newState.todos[index].isDone;
          return true;
        }
        return false;
      });
      break;
    }

    default:
      break;
  }
  return newState;
};

interface AddTodosPayload {
  todos: Todo[];
}

interface AddTodoPayload {
  todo: Todo;
}

interface DeleteTodoPayload {
  id: number;
}

interface TriggerDoneTodoPayload {
  id: number;
}
