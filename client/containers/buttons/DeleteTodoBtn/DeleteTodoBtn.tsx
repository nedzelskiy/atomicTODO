import * as React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/atomes/Button/Button';
import { deleteTodo, DeleteTodo } from '../../../../data/todos/redux/todos.redux.actions';
import withTranslator, { TranslateHelperProps } from '../../hocs/withTranslator';

interface Props extends TranslateHelperProps {
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

export default withTranslator(connect(null, { deleteTodo })(DeleteTodoBtn));
