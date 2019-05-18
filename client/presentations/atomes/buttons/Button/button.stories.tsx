import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './Button';

storiesOf('atomes/buttons/Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>some text</Button>
  ));
