import * as React from 'react';
import DeleteTodoBtn from '../../../containers/buttons/DeleteTodoBtn/DeleteTodoBtn';
import TriggerTodoStatusBtn
  from '../../../containers/buttons/TriggerTodoStatusBtn/TriggerTodoStatusBtn';
import { Todo } from '../../../../data/todos/redux/todos.redux.initial-state';
import './todoitem.styles.scss';

export interface Props extends Todo {}

let i = 0;

const TodoItem: React.FunctionComponent<Props> = ({ isDone, name, id }: Props): JSX.Element => (
  <div className={`todo-item ${isDone ? 'done' : ''}`}>
    <span className="todo-name">{name} {i++}</span>
    <TriggerTodoStatusBtn id={id} />
    <DeleteTodoBtn id={id} />
  </div>
);

export default TodoItem;
