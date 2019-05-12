import * as React from 'react';
import { connect } from 'react-redux';
import { Todo } from '../../../../data/todos/redux/todos.redux.initial-state';
import { TodosReducerState } from '../../../../data/redux.reducers';
import todosStorage from '../../../../data/todos/TodosStorage/TodosLocalStorage';
import { addTodos, AddTodos } from '../../../../data/todos/redux/todos.redux.actions';
import TodoListWithControls
  from '../../../components/organismes/TodoListWithControls/TodoListWithControls';

interface Props {
  todos: Todo[];
  addTodos: AddTodos;
}

class TodoListWithControlsContainer extends React.PureComponent<Props, {}> {
  componentDidMount() {
    this.props.addTodos(todosStorage.getTodos());
  }

  render() {
    if (this.props.todos) {
      return (
        <TodoListWithControls todos={this.props.todos}/>
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
)(TodoListWithControlsContainer);
