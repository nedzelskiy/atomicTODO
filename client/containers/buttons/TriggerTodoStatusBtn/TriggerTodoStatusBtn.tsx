import * as React from 'react';
import { connect } from 'react-redux';
import PrimaryBtn from '../../../presentations/atomes/buttons/PrimaryBtn/PrimaryBtn';
import componentConnector from '../../decorators/componentConnector';
import { triggerDoneTodo, TriggerDoneTodo } from '../../../../data/todos/redux/todos.redux.actions';

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
      <PrimaryBtn onClick={this.handleOnClick}>
        ☑
      </PrimaryBtn>
    );
  }
}

export default componentConnector(
  connect(null, { triggerDoneTodo })(TriggerTodoStatusBtn),
  PrimaryBtn,
);
