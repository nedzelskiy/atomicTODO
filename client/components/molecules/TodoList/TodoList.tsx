import * as React from 'react';
import TodoItem from '../../molecules/TodoItem/TodoItem';
import { Todo } from '../../../../data/todos/redux/todos.redux.initial-state';

interface Props {
  todos: Todo[];
}

const TodoList: React.FunctionComponent<Props> = ({ todos }: Props): JSX.Element => (
  <div className="todo-list">
    { todos.map((todo) => {
      return <TodoItem {...todo} />;
    }) }
  </div>
);

export default TodoList;
