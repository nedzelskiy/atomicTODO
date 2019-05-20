import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SecondaryBtn from './SecondaryBtn';

storiesOf('atomes/buttons/SecondaryBtn', module)
  .add('with text', () => <SecondaryBtn>some text</SecondaryBtn>);
