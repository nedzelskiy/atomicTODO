import * as React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/atomes/Button/Button';
import { deleteTodo, DeleteTodo } from '../../../../redux/todos/todos.redux.actions';
import withTranslations, { I18nTranslatePropsHelper } from '../../hocs/withTranslations';

interface Props extends I18nTranslatePropsHelper{
  id: number;
  deleteTodo: DeleteTodo;
}

class DeleteTodoBtn extends React.Component<Props, {}> {
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
      <Button
        className="todo-delete"
        onClick={this.handleOnClick}
      >
        {t('delete')}
      </Button>
    );
  }
}

export default withTranslations(connect(null, { deleteTodo })(DeleteTodoBtn));
