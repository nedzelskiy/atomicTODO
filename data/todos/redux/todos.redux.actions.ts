import events from './todos.redux.events';
import { Todo } from './todos.redux.initial-state';
import { CommonAction } from '../../redux.interfaces';

interface AddTodosAction {
  type: events.ADD_TODOS;
  payload: {
    todos: Todo[];
  };
}

export interface AddTodos {
  (todos: Todo[]): CommonAction & AddTodosAction;
}

export const addTodos: AddTodos = (todos: Todo[]): AddTodosAction => {
  return {
    type: events.ADD_TODOS,
    payload: {
      todos,
    },
  };
};

export interface AddTodo {
  (todo: Todo): CommonAction & {
    payload: {
      todo: Todo;
    };
  };
}

export const addTodo: AddTodo = (todo: Todo) => {
  return {
    type: events.ADD_TODO,
    payload: {
      todo,
    },
  };
};

export interface DeleteTodo {
  (id: number): CommonAction & {
    payload: {
      id: number;
    };
  };
}

export const deleteTodo: DeleteTodo = (id: number) => {
  return {
    type: events.DELETE_TODO,
    payload: {
      id,
    },
  };
};

export interface TriggerDoneTodo {
  (id: number): CommonAction & {
    payload: {
      id: number;
    };
  };
}

export const triggerDoneTodo: TriggerDoneTodo = (id: number) => {
  return {
    type: events.TRIGGER_DONE_TODO,
    payload: {
      id,
    },
  };
};
