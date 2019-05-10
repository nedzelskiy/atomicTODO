import * as React from 'react';
import { connect } from 'react-redux';
import { Todo } from '../../../../data/todos/redux/todos.redux.initial-state';
import todosStorage from '../../../../data/todos/TodosStorage/TodosLocalStorage';
import HomeWithThemePanel
  from '../../../components/templates/HomeWithThemePanel/HomeWithThemePanel';
import { addTodos, AddTodos } from '../../../../data/todos/redux/todos.redux.actions';

interface Props {
  addTodos: AddTodos;
}

class HomePage extends React.Component<Props, {}> {
  componentDidMount(): void {
    const todos: Todo[] = todosStorage.getTodos();
    this.props.addTodos(todos);
  }

  render() {
    return (
      <HomeWithThemePanel />
    );
  }
}

export default connect(null, {
  addTodos,
})(HomePage);
