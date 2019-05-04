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

export const createNewTodo = (todoName: string): Todo => {
  return {
    id: (new Date()).getTime(),
    name: todoName,
    isDone: false,
  };
};
