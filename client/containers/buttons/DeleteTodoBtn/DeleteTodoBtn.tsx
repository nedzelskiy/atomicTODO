import * as React from 'react';
import { connect } from 'react-redux';
import PrimaryLowNoticeBtn from
    '../../../presentations/atomes/buttons/PrimaryLowNoticeBtn/PrimaryLowNoticeBtn';
import { deleteTodo, DeleteTodo } from '../../../../data/todos/redux/todos.redux.actions';
import withTranslator, { TranslateHelperProps } from '../../decorators/withTranslator';
import componentConnector from '../../decorators/componentConnector';

interface Props extends TranslateHelperProps {
  id: number;
  deleteTodo: DeleteTodo;
}

class DeleteTodoBtn extends React.Component<Readonly<Props>, {}> {
  constructor(props: Props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.deleteTodo(this.props.id);
  }

  render() {
    const { t } = this.props;
    return (
      <PrimaryLowNoticeBtn onClick={this.handleOnClick}>
        {t('delete')}
      </PrimaryLowNoticeBtn>
    );
  }
}

export default componentConnector(
  withTranslator(connect(null, { deleteTodo })(DeleteTodoBtn)),
  PrimaryLowNoticeBtn,
);
