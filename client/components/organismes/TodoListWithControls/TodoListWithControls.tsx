import * as React from 'react';
import TodoList from '../../molecules/TodoList/TodoList';
import { Todo } from '../../../../data/todos/redux/todos.redux.initial-state';
import TodoItemCreator from '../../molecules/TodoItemCreator/TodoItemCreator';

interface Props {
  todos: Todo[];
}

const TodoListWithControls: React.FunctionComponent<Props> = ({ todos }: Props) => (
  <div className="todo-list-with-controls">
    <TodoItemCreator />
    <TodoList todos={todos} />
  </div>
);

export default TodoListWithControls;
