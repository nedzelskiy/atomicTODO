import * as React from 'react';
import { connect } from 'react-redux';
import withConnector from '../../decorators/withConnector';
import { addTodo, AddTodo } from '../../../../data/todos/redux/todos.redux.actions';
import { createNewTodo } from '../../../../data/todos/redux/todos.redux.initial-state';
import withTranslator, { TranslateHelperProps } from '../../decorators/withTranslator';
import SecondaryBtn from '../../../components/atomes/buttons/SecondaryBtn/SecondaryBtn';
import { TranslateHelper } from '../../../../data/translations/trnaslations.interfaces';

interface Props extends TranslateHelperProps {
  inputRef: React.RefObject<HTMLInputElement>;
  addTodo: AddTodo;
}

class AddTodoBtn extends React.Component<Readonly<Props>, {}> {
  static getBtnText(t: TranslateHelper) {
    return `+ ${t('New task')}`;
  }

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
    return (
      <SecondaryBtn onClick={this.handleOnClick}>
        {AddTodoBtn.getBtnText(this.props.t)}
      </SecondaryBtn>
    );
  }
}

export default withConnector(
  withTranslator(connect(null, { addTodo })(AddTodoBtn)),
  SecondaryBtn,
  {
    children: AddTodoBtn.getBtnText(t => t),
  },
);
