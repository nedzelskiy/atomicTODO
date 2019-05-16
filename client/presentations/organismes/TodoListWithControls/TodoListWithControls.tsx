import * as React from 'react';
import TodoItemCreator from '../../molecules/TodoItemCreator/TodoItemCreator';
import TodoListWithData from '../../../containers/lists/TodoListWithData/TodoListWithData';

// const TodoListWithControls: React.FunctionComponent<Props> = ({ todos }: Props) => (
//   <div className="todo-list-with-controls">
//     <TodoItemCreator />
//     <TodoList todos={todos} />
//   </div>
// );

class TodoListWithControls extends React.Component<{}, {}> {
  render() {
    return (
      <div className="todo-list-with-controls">
         <TodoItemCreator />
         <TodoListWithData />
     </div>
    );
  }
}

export default TodoListWithControls;
