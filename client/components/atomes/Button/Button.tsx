import './button.styles.scss';
import * as React from 'react';

interface Props {
  text: string;
  className?: string;
  attributes?: any[];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FunctionComponent<Props> = (props: Props): JSX.Element => (
  <button
    {...props.attributes}
    onClick={props.onClick}
    className={`button ${props.className}`}
  >
    {props.text}
  </button>
);

Button.defaultProps = {
  className: '',
  attributes: [],
  onClick: () => {},
};

export default Button;
