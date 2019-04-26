export interface State {
  todos: Todo[];
}

export interface Todo {
  id: number;
  name: string;
  isDone: boolean;
}

const initialState: State = {
  todos: [],
};

export default initialState;
