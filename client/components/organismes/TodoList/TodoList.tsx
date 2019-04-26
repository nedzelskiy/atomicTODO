import * as React from 'react';
import ls from '../../../utils/LocalStorage';
import { Todo } from '../../App/app.redux.initial-state';
import TodoItem from '../../molecules/TodoItem/TodoItem';
import TodoItemCreator from '../../molecules/TodoItemCreator/TodoItemCreator';

interface State {
  todos: Todo[];
}

class TodoList extends React.Component<any, State> {
  state = {
    todos: ls.getStoredTodos(),
  };

  renderTodoList() {
    return this.state.todos.map((todo) => {
      return <TodoItem
        key={todo.id}
        todoName={todo.name}
        isDone={todo.isDone}
      />;
    });
  }

  render() {
    return (
      <div className="todo-list">
        <TodoItemCreator />
        {this.renderTodoList()}
      </div>
    );
  }
}

export default TodoList;
