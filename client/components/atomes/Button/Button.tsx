import './button.styles.scss';
import * as React from 'react';

interface Props {
  children: string;
  className?: string;
  attributes?: any[];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FunctionComponent<Props> = (props: Props): JSX.Element => (
  <button
    {...props.attributes}
    onClick={props.onClick}
    onMouseOver={props.onMouseOver}
    className={`button ${props.className}`}
  >
    {props.children}
  </button>
);

Button.defaultProps = {
  className: '',
  attributes: [],
  onClick: () => {},
};

export default Button;
