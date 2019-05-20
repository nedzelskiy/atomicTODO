import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import Button from './Button';

storiesOf('atomes/buttons/Button', module)
  .addDecorator(withKnobs)
  .add('with text', () => (
    <Button onClick={action('clicked')}>{text('btn text', 'some text')}</Button>
  ));
