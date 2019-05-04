import { Todo } from '../redux/todos.redux.initial-state';

interface LocalStorageClass {
  getStoredTodos(): Todo[];
}

class TodosLocalStorage implements LocalStorageClass{
  getStoredTodos() {
    return [
      {
        id: 1556103491852,
        isDone: false,
        name: 'set up env',
      },
      {
        id: 1556103491892,
        isDone: true,
        name: 'typescript',
      },
    ];
  }
}

export default new TodosLocalStorage();
