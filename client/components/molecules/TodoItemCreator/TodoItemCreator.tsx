import * as React from 'react';
import AddTodoBtn from '../../../containers/buttons/AddTodoBtn/AddTodoBtn';
import './todoitemcreator.styles.scss';

const inputRef: React.RefObject<HTMLInputElement> = React.createRef();

const TodoItemCreator: React.FunctionComponent<{}> = (): JSX.Element => (
  <div className="create-todo-item">
    <input type="text" ref={inputRef} />
    <AddTodoBtn inputRef={inputRef} />
  </div>
);

export default TodoItemCreator;
