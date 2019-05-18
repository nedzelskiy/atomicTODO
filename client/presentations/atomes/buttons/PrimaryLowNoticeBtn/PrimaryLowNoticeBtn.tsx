import * as React from 'react';
import Button, { Props as ButtonProps } from '../Button/Button';
import './primary-lownotice-btn.styles.scss';

const PrimaryLowNoticeBtn: React.FunctionComponent<Readonly<ButtonProps>> =
  ({ children, ...other }: ButtonProps): JSX.Element => (
    <Button className="primary-lownotice-btn" {...other}>{children}</Button>
  );

export default PrimaryLowNoticeBtn;
