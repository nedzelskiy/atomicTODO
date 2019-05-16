import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('Buttons', module)
  .add('with text', () => <Button>some text</Button>);
