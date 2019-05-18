import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TodoItem from './TodoItem';

storiesOf('molecules/TodoItem', module)
  .add('with text', () => <TodoItem isDone={false} id={3453423} name="Name" />);
