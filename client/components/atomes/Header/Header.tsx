import * as React from 'react';
import NavLink from '../../services/NavLink/NavLink';
import './header.styless.scss';

export default (): JSX.Element => (
  <header className="header">
    <NavLink to="/ru">/ru</NavLink>
    <NavLink to="/en">/en</NavLink>
  </header>
);
