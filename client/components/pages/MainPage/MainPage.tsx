import * as React from 'react';
import { connect } from 'react-redux';
import ls from '../../../utils/LocalStorage';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import { addTodos } from '../../organismes/TodoList/todolist.redux.actions';
import { Todo } from '../../organismes/TodoList/todolist.redux.initial-state';

class MainPage extends React.Component<any, any> {
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
