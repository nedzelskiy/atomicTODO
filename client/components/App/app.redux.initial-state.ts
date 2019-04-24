import ls from '../../utils/LocalStorage';

export interface State {
  todos: Todo[];
}

export interface Todo {
  id: number;
  name: string;
  isDone: boolean;
}

const initialState: State = {
  todos: ls.getStoredTodos(),
};

export default initialState;
