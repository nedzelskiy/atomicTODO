import * as React from 'react';
import './button.styles.scss';

interface Props {
  children: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FunctionComponent<Props> = (props: Props): JSX.Element => (
  <button
    onClick={props.onClick}
    className={`button ${props.className}`}
  >
    {props.children}
  </button>
);

Button.defaultProps = {
  className: '',
  onClick: () => {},
};

export default Button;
