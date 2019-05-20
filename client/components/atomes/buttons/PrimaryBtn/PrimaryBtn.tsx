import * as React from 'react';
import Button, { Props as ButtonProps } from '../Button/Button';
import './primary-btn.styles.scss';

const PrimaryBtn: React.FunctionComponent<Readonly<ButtonProps>> =
  ({ children, ...other }: ButtonProps): JSX.Element => (
    <Button className="primary-btn" {...other}>{children}</Button>
  );

export default PrimaryBtn;
