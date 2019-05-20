import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import TodoItem from './TodoItem';

storiesOf('molecules/TodoItem', module)
  .addDecorator(withKnobs)
  .add('instance', () => (
    <TodoItem
      isDone={boolean('isDone', false)}
      id={number('id (date)', 1558352759027)}
      name={text('name', 'Todo item text')}
    />
  ));
