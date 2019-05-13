import * as React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/atomes/Button/Button';
import { addTodo, AddTodo } from '../../../../data/todos/redux/todos.redux.actions';
import { createNewTodo } from '../../../../data/todos/redux/todos.redux.initial-state';
import withTranslations, { TranslateHelperProps } from '../../hocs/withTranslations';

interface Props extends TranslateHelperProps {
  inputRef: React.RefObject<HTMLInputElement>;
  addTodo: AddTodo;
}

class AddTodoBtn extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    const { current } = this.props.inputRef;
    if (current) {
      current.addEventListener('keypress', ({ key }) => {
        if (current.value && key === 'Enter') {
          this.addTodo(current);
        }
      });
    }
  }

  addTodo(input: HTMLInputElement) {
    if (!input.value.trim()) {
      return;
    }
    const todo = createNewTodo(input.value);
    this.props.addTodo(todo);
    input.value = '';
    input.blur();
  }

  handleOnClick() {
    const { current } = this.props.inputRef;
    if (current && current.value) {
      this.addTodo(current);
    }
  }

  render() {
    const { t } = this.props;
    console.log('render AddTodoBtn');
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
