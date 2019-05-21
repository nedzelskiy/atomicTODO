import * as React from 'react';
import { connect } from 'react-redux';
import PrimaryLowNoticeBtn from
    '../../../components/atomes/buttons/PrimaryLowNoticeBtn/PrimaryLowNoticeBtn';
import { deleteTodo, DeleteTodo } from '../../../../data/todos/redux/todos.redux.actions';
import withTranslator, { TranslateHelperProps } from '../../decorators/withTranslator';
import withConnector from '../../decorators/withConnector';
import { TranslateHelper } from '../../../../data/translations/trnaslations.interfaces';

interface Props extends TranslateHelperProps {
  id: number;
  deleteTodo: DeleteTodo;
}

class DeleteTodoBtn extends React.Component<Readonly<Props>, {}> {
  static getBtnText(t: TranslateHelper) {
    return t('delete');
  }

  constructor(props: Props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.deleteTodo(this.props.id);
  }

  render() {
    return (
      <PrimaryLowNoticeBtn onClick={this.handleOnClick}>
        {DeleteTodoBtn.getBtnText(this.props.t)}
      </PrimaryLowNoticeBtn>
    );
  }
}

export default withConnector(
  withTranslator(connect(null, { deleteTodo })(DeleteTodoBtn)),
  PrimaryLowNoticeBtn,
  {
    children: DeleteTodoBtn.getBtnText(t => t),
  },
);

export const serverDataFetchJobs = [
  async () => {
    const data = await new Promise((res) => {
      setTimeout(
        () => {
          res(1);
        },
        2000);
    });
    return data;
  },
];
