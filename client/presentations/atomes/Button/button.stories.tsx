import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('atomes', module);
storiesOf('atomes.Button', module)
  .add('with text', () => <Button>some text</Button>)
  .add('without text', () => <Button>&nbsp;</Button>)
  .add('with long text', () => <Button>some long long long text</Button>);
