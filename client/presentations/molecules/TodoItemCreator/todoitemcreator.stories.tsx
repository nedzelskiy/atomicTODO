import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TodoItemCreator from './TodoItemCreator';

storiesOf('molecules', module);
storiesOf('molecules.TodoItemCreator', module)
  .add('with text', () => <TodoItemCreator />);
