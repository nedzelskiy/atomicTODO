import * as React from 'react';
import NavLink from '../../services/NavLink/NavLink';
import './header.styles.scss';

const Header = (): JSX.Element => (
  <header className="header">
    <NavLink to="/">/</NavLink>
    <NavLink to="/ru">/ru</NavLink>
    <NavLink to="/en">/en</NavLink>
    <NavLink to="/unknown">/en</NavLink>
  </header>
);

export default Header;
