import * as React from 'react';
import TodoList from '../../molecules/TodoList/TodoList';
import { Todo } from '../../../../data/todos/redux/todos.redux.initial-state';
import TodoItemCreator from '../../molecules/TodoItemCreator/TodoItemCreator';
import './todolist-with-controls.styles.scss';

interface Props {
  todos: Todo[];
}

let i =0;

const TodoListWithControls: React.FunctionComponent<Props> = ({ todos }: Props) => (
  <div className="todo-list-with-controls">
    <TodoItemCreator />
    <div>TodoListWithControls {i++}</div>
    <TodoList todos={todos} />
  </div>
);

export default TodoListWithControls;
