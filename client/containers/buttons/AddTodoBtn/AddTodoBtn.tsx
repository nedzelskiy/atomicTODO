import * as React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/atomes/Button/Button';
import { Todo } from '../../../../redux/todos/todos.redux.initial-state';
import { addTodo, AddTodo } from '../../../../redux/todos/todos.redux.actions';
import withTranslations, { I18nTranslatePropsHelper } from '../../hocs/withTranslations';

interface Props extends I18nTranslatePropsHelper{
  inputRef: React.RefObject<HTMLInputElement>;
  addTodo: AddTodo;
}

class AddTodoBtn extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    if (this.props.inputRef.current && this.props.inputRef.current.value) {
      const todo: Todo = {
        id: (new Date()).getTime(),
        isDone: false,
        name: this.props.inputRef.current.value,
      };
      this.props.addTodo(todo);
      this.props.inputRef.current.value = '';
      this.props.inputRef.current.blur();
    }
  }

  render() {
    const { t } = this.props;
    return (
      <Button
        className="create-todo"
        onClick={this.handleOnClick}
      >
        {`+ ${t('New task')}`}
      </Button>
    );
  }
}

export default withTranslations(connect(null, { addTodo })(AddTodoBtn));
