import { Todo } from './todos.redux.initial-state';
import * as constants from './todos.redux.constants';
import { Action as CommonAction } from '../../redux.interfaces';

export interface AddTodos {
  (todos: Todo[]): CommonAction & {
    payload: {
      todos: Todo[];
    };
  };
}

export const addTodos: AddTodos = (todos: Todo[]) => {
  return {
    type: constants.ADD_TODOS,
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
    type: constants.ADD_TODO,
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
    type: constants.DELETE_TODO,
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
    type: constants.TRIGGER_DONE_TODO,
    payload: {
      id,
    },
  };
};
