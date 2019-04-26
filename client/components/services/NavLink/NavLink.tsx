import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FunctionComponent<Props> = (props: Props): JSX.Element => (
  <Link className="nav-link" to={props.to}>{props.children}</Link>
);

export default NavLink;
