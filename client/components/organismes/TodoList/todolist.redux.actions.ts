import { Todo } from './todolist.redux.initial-state';
import * as constants from './todolist.redux.constants';

export const addTodos = (todos: Todo[]) => {
  return {
    type: constants.TODO_LIST__ADD_TODOS,
    payload: {
      todos,
    },
  };
};

export const addTodo = (todoName: string) => {
  const todo: Todo = {
    id: (new Date()).getTime(),
    isDone: false,
    name: todoName,
  };
  return {
    type: constants.TODO_LIST__ADD_TODO,
    payload: {
      todo,
    },
  };
};

export const deleteTodo = (id: number) => {
  return {
    type: constants.TODO_LIST__DELETE_TODO,
    payload: {
      id,
    },
  };
};

export const triggerDoneTodo = (id: number) => {
  return {
    type: constants.TODO_LIST__TRIGGER_DONE_TODO,
    payload: {
      id,
    },
  };
};
