import * as React from 'react';
import { connect } from 'react-redux';
import componentConnector from '../../decorators/componentConnector';
import { addTodo, AddTodo } from '../../../../data/todos/redux/todos.redux.actions';
import { createNewTodo } from '../../../../data/todos/redux/todos.redux.initial-state';
import withTranslator, { TranslateHelperProps } from '../../decorators/withTranslator';
import SecondaryBtn from '../../../presentations/atomes/buttons/SecondaryBtn/SecondaryBtn';

interface Props extends TranslateHelperProps {
  inputRef: React.RefObject<HTMLInputElement>;
  addTodo: AddTodo;
}

class AddTodoBtn extends React.Component<Readonly<Props>, {}> {
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
    console.log('___ render AddTodoBtn', this.props);
    const { t } = this.props;
    return (
      <SecondaryBtn onClick={this.handleOnClick}>
        {`+ ${t('New task')}`}
      </SecondaryBtn>
    );
  }
}

export default componentConnector(
  withTranslator(connect(null, { addTodo })(AddTodoBtn)),
  SecondaryBtn,
);
