import { Todo } from '../redux/todos.redux.initial-state';

interface Storage {
  getTodos(): Todo[];
  setTodos(todos: Todo[]): void;
}

class TodosLocalStorage implements Storage {
  static readonly storageKey = 'todos';

  getTodos() {
    try {
      const todos = JSON.parse(<any>localStorage.getItem(TodosLocalStorage.storageKey));
      if (!todos) {
        throw new Error('no todos stored in local storage!');
      }
      return todos;
    } catch (e) {
      return [];
    }
  }

  setTodos(todos: Todo[]) {
    localStorage.setItem(TodosLocalStorage.storageKey, JSON.stringify(todos));
  }
}

export default new TodosLocalStorage();
