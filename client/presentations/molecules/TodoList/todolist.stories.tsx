import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TodoList from './TodoList';

storiesOf('molecules/TodoList', module)
  .add('with text', () => <TodoList todos={[{ isDone: false, id:2323, name: 'Name' }]} />);
