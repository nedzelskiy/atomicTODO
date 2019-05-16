import * as React from 'react';
import { connect } from 'react-redux';
import { addTodos, AddTodos } from '../../../../data/todos/redux/todos.redux.actions';
import { TodosReducerState } from '../../../../data/redux.reducers';
import todosStorage from '../../../../data/todos/TodosStorage/TodosLocalStorage';
import TodoList from '../../../presentations/molecules/TodoList/TodoList';

interface Props {
  todos: any;
  addTodos: AddTodos;
}

class TodoListWithData extends React.Component<Readonly<Props>, {}> {
  componentDidMount() {
    this.props.addTodos(todosStorage.getTodos());
  }

  render() {
    const { todos } = this.props;
    if (todos && todos[0]) {
      return (
        <TodoList todos={todos} />
      );
    }
    return null;
  }
}

export default connect(
  ({ todosReducer }: TodosReducerState) => {
    return {
      todos: todosReducer.todos,
    };
  },
  {
    addTodos,
  },
)(TodoListWithData);
