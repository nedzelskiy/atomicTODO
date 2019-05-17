import * as React from 'react';
import { connect } from 'react-redux';
import withMockedContainer from '../../hocs/withMockedContainer';
import Button, { Props as ButtonProps } from '../../../presentations/atomes/Button/Button';
import { addTodo, AddTodo } from '../../../../data/todos/redux/todos.redux.actions';
import { createNewTodo } from '../../../../data/todos/redux/todos.redux.initial-state';
import withTranslator, { TranslateHelperProps } from '../../hocs/withTranslator';

interface Props extends TranslateHelperProps {
  inputRef: React.RefObject<HTMLInputElement>;
  addTodo: AddTodo;
}

const PureComponent: React.FunctionComponent<Readonly<ButtonProps>> =
  ({ children, ...other }: ButtonProps): JSX.Element => (
    <Button className="create-todo" {...other}>{children}</Button>
  );

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
      <PureComponent
        onClick={this.handleOnClick}
      >
        {`+ ${t('New task')}`}
      </PureComponent>
    );
  }
}

export default withMockedContainer(
  PureComponent,
  withTranslator(connect(null, { addTodo })(AddTodoBtn)),
);
