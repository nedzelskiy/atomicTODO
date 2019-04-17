import * as React from 'react';
import './button.styles.scss';

interface Props {
  text: string;
  className?: string;
  attributes?: any[];
}

const button: React.FunctionComponent<Props> = (props: Props): JSX.Element => (
  <button
    {...props.attributes}
    className={`button ${props.className}`}
  >{props.text}</button>
);

button.defaultProps = {
  className: '',
  attributes: [],
};

export default button;
