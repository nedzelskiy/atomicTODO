import * as React from 'react';
import { storiesOf } from '@storybook/react';
import PrimaryLowNoticeBtn from './PrimaryLowNoticeBtn';

storiesOf('atomes/buttons/PrimaryLowNoticeBtn', module)
.add('with text', () => <PrimaryLowNoticeBtn>some text</PrimaryLowNoticeBtn>);
