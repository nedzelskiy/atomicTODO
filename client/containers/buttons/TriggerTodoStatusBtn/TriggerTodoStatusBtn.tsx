import * as React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/atomes/Button/Button';
import { triggerDoneTodo, TriggerDoneTodo } from '../../../../redux/todos/todos.redux.actions';

interface Props {
  id: number;
  triggerDoneTodo: TriggerDoneTodo;
}

class TriggerTodoStatusBtn extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.triggerDoneTodo(this.props.id);
  }

  render() {
    return (
      <Button
        className="todo-trigger-done"
        onClick={this.handleOnClick}
      >
        &#10004;
      </Button>
    );
  }
}

export default connect(null, { triggerDoneTodo })(TriggerTodoStatusBtn);
