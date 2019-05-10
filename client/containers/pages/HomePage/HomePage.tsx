import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Todo } from '../../../../data/todos/redux/todos.redux.initial-state';
import todosStorage from '../../../../data/todos/TodosStorage/TodosLocalStorage';
import HomeTemplate from '../../../components/templates/HomeTemplate/HomeTemplate';
import { addTodos, AddTodos } from '../../../../data/todos/redux/todos.redux.actions';
import Header from '../../../components/atomes/Header/Header';
import TodoListWithControlsContainer from '../../lists/TodoListWithControlsContainer/TodoListWithControlsContainer';
import ChangeThemePanel from '../../../components/molecules/ChangeThemePanel/ChangeThemePanel';


interface Props {
  addTodos: AddTodos;
}

class HomePage extends React.Component<Props, {}> {
  componentDidMount(): void {
    const todos: Todo[] = todosStorage.getTodos();
    this.props.addTodos(todos);
  }

  render() {
    console.log('render Home page')
    return (
      <div className="main-template wrapper">
        <Header/>
        <Switch>
          <Route path="/:locale/theme" component={ChangeThemePanel} />
        </Switch>
        <TodoListWithControlsContainer />
      </div>
    );
  }
}

export default connect(null, {
  addTodos,
})(HomePage);
