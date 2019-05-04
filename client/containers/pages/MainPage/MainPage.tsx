import * as React from 'react';
import { connect } from 'react-redux';
import ls from '../../../../data/todos/TodosLocalStorage/TodosLocalStorage';
import MainTemplate from '../../../components/templates/MainTemplate/MainTemplate';
import { addTodos, AddTodos } from '../../../../data/todos/redux/todos.redux.actions';
import { Todo } from '../../../../data/todos/redux/todos.redux.initial-state';

interface Props {
  addTodos: AddTodos;
}

class MainPage extends React.Component<Props, {}> {
  componentDidMount(): void {
    const todos: Todo[] = ls.getStoredTodos();
    this.props.addTodos(todos);
  }

  render() {
    return (
      <MainTemplate />
    );
  }
}

export default connect(null, {
  addTodos,
})(MainPage);
