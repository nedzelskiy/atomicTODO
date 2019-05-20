import * as React from 'react';
import { storiesOf } from '@storybook/react';
import PrimaryBtn from './PrimaryBtn';

storiesOf('atomes/buttons/PrimaryBtn', module)
  .add('with text', () => <PrimaryBtn>some text</PrimaryBtn>);
