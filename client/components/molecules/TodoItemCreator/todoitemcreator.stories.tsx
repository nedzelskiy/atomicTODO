import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TodoItemCreator from './TodoItemCreator';

storiesOf('molecules/TodoItemCreator', module)
  .add('instance', () => <TodoItemCreator />);
