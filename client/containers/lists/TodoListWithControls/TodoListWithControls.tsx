import * as React from 'react';
import { connect } from 'react-redux';
import { Todo } from '../../../../data/todos/redux/todos.redux.initial-state';
import { TodosReducersState } from '../../../../data/redux.reducers';
import TodoListWithControls
  from '../../../components/organismes/TodoListWithControls/TodoListWithControls';

interface Props {
  todos: Todo[];
}

class TodoListWithControlsContainer extends React.Component<Props, {}> {
  render() {
    return (
      <TodoListWithControls todos={this.props.todos} />
    );
  }
}

export default connect(
  ({ todosReducer }: TodosReducersState) => {
    return {
      todos: todosReducer.todos,
    };
  },
  null,
)(TodoListWithControlsContainer);
