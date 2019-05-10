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

interface State {
  counter: number;
}

class AddTodoBtn extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.countStateOnClick = this.countStateOnClick.bind(this);
    this.state = {
      counter: 0,
    };
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

  countStateOnClick() {
    this.setState({ counter: this.state.counter + 1 });
  }

  render() {
    const { t } = this.props;
    console.log('$$');
    return [
      <button
        key="1"
        onClick={this.countStateOnClick}
      >{this.state.counter}</button>,
      <Button
        key="2"
        className="create-todo"
        onClick={this.handleOnClick}
      >
        {`+ ${t('New task')}`}
      </Button>,
    ];
  }
}


export default withTranslations(connect(null, { addTodo })(AddTodoBtn));
