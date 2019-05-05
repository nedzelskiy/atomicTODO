import * as React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/atomes/Button/Button';
import { addTodo, AddTodo } from '../../../../data/todos/redux/todos.redux.actions';
import { createNewTodo } from '../../../../data/todos/redux/todos.redux.initial-state';
import withTranslations, { TranslateHelperProp } from '../../hocs/withTranslations';

interface Props extends TranslateHelperProp {
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
      const todo = createNewTodo(this.props.inputRef.current.value);
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
