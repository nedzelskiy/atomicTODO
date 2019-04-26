import * as React from 'react';
import { connect } from 'react-redux';
import TodoItem from '../../molecules/TodoItem/TodoItem';
import { Todo, State } from './todolist.redux.initial-state';
import TodoItemCreator from '../../molecules/TodoItemCreator/TodoItemCreator';
import {
  addTodo,
  deleteTodo,
  triggerDoneTodo,
} from './todolist.redux.actions';
import './todolist.styles.scss';

export interface Props {
  todos: Todo[];
  addTodo: Function;
  deleteTodo: Function;
  triggerDoneTodo: Function;
}

class TodoList extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleTriggerDoneTodo = this.handleTriggerDoneTodo.bind(this);
  }

  handleDeleteTodo(id: number) {
    this.props.deleteTodo(id);
  }

  handleTriggerDoneTodo(id: number) {
    this.props.triggerDoneTodo(id);
  }

  handleAddTodo(todoName: string) {
    this.props.addTodo(todoName);
  }

  renderTodoList() {
    return this.props.todos.map((todo) => {
      return <TodoItem
        id={todo.id}
        key={todo.id}
        todoName={todo.name}
        isDone={todo.isDone}
        onDelete={this.handleDeleteTodo}
        onTriggerDone={this.handleTriggerDoneTodo}
      />;
    });
  }

  render() {
    if (this.props.todos) {
      return (
        <div className="todo-list">
          <TodoItemCreator
            onAdd={this.handleAddTodo}
          />
          {this.renderTodoList()}
        </div>
      );
    }
    return null;
  }
}

export default connect((state: { TodoList: State }) => {
  return {
    todos: state.TodoList.todos,
  };
},                     {
  addTodo,
  deleteTodo,
  triggerDoneTodo,
},
)(TodoList);
