import * as React from 'react';
import { connect } from 'react-redux';
import PrimaryBtn from '../../../components/atomes/buttons/PrimaryBtn/PrimaryBtn';
import withConnector from '../../decorators/withConnector';
import { triggerDoneTodo, TriggerDoneTodo } from '../../../../data/todos/redux/todos.redux.actions';

interface Props {
  id: number;
  triggerDoneTodo: TriggerDoneTodo;
}

class TriggerTodoStatusBtn extends React.Component<Props, {}> {
  static getBtnText() {
    return '☑';
  }

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
        {TriggerTodoStatusBtn.getBtnText()}
      </PrimaryBtn>
    );
  }
}

export default withConnector(
  connect(null, { triggerDoneTodo })(TriggerTodoStatusBtn),
  PrimaryBtn,
  {
    children: TriggerTodoStatusBtn.getBtnText(),
  },
);
