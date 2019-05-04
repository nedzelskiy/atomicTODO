import { cloneDeep } from 'lodash';
import * as events from './todos.redux.events';
import { CommonAction } from '../../redux.interfaces';
import initialState, { State, Todo } from './todos.redux.initial-state';

export default (state: State = initialState, action: CommonAction): State => {
  const newState: State = cloneDeep(state);
  switch (action.type) {
    case events.ADD_TODOS: {
      const { todos } = <AddTodosPayload>action.payload;
      newState.todos = todos;
      break;
    }

    case events.ADD_TODO: {
      const { todo } = <AddTodoPayload>action.payload;
      newState.todos.push(todo);
      break;
    }

    case events.DELETE_TODO: {
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

    case events.TRIGGER_DONE_TODO: {
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
