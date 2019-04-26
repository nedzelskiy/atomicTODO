import * as React from 'react';
import { Link } from 'react-router-dom';

export default (props: {to: string, children: React.ReactNode}): JSX.Element => (
  <Link className="nav-link" to={props.to}>{props.children}</Link>
);
