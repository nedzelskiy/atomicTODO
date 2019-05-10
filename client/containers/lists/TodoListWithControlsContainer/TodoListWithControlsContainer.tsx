import * as React from 'react';
import { connect } from 'react-redux';
import { Todo } from '../../../../data/todos/redux/todos.redux.initial-state';
import { TodosReducerState } from '../../../../data/redux.reducers';
import TodoListWithControls
  from '../../../components/organismes/TodoListWithControls/TodoListWithControls';

interface Props {
  todos: Todo[];
}

class TodoListWithControlsContainer extends React.PureComponent<Props, {}> {
  render() {
    console.log('render TodoListWithControlsContainer', this.props);
    return (
      <TodoListWithControls todos={this.props.todos} />
    );
  }
}

export default connect(
  ({ todosReducer }: TodosReducerState) => {
    return {
      todos: todosReducer.todos,
    };
  },
  null,
)(TodoListWithControlsContainer);
