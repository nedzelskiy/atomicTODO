import * as React from 'react';
import DeleteTodoBtn from '../../../containers/buttons/DeleteTodoBtn/DeleteTodoBtn';
import TriggerTodoStatusBtn
  from '../../../containers/buttons/TriggerTodoStatusBtn/TriggerTodoStatusBtn';
import './todoitem.styles.scss';

export interface Props {
  id: number;
  isDone: boolean;
  todoName: string;
}

const TodoItem: React.FunctionComponent<Props> = (props: Props): JSX.Element => (
  <div className={`todo-item ${props.isDone ? 'done' : ''}`}>
    <span className="todo-name">{props.todoName}</span>
    <TriggerTodoStatusBtn id={props.id} />
    <DeleteTodoBtn id={props.id} />
  </div>
);

export default TodoItem;
