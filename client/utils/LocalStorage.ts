import { Todo } from '../components/App/app.redux.initial-state';

interface LocalStorageClass {
  getStoredTodos(): Todo[];
}

class LocalStorage implements LocalStorageClass{
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

export default new LocalStorage();
