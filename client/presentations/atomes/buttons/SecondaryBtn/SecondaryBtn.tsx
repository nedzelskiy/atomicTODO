import * as React from 'react';
import Button, { Props as ButtonProps } from '../Button/Button';
import './secondary-btn.styles.scss';

const SecondaryBtn: React.FunctionComponent<Readonly<ButtonProps>> =
  ({ children, ...other }: ButtonProps): JSX.Element => (
    <Button className="secondary-btn" {...other}>{children}</Button>
  );

export default SecondaryBtn;
