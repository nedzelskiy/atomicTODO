import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TodoList from './TodoList';

storiesOf('molecules/TodoList', module)
  .add('TodoItem[]', () => <TodoList todos={[
    {
      isDone: false,
      name: 'Todo item text 1',
      id: 1558350722513,
    },
    {
      isDone: true,
      name: 'Todo item text 2',
      id: 1558350722514,
    },
  ]}/>);
