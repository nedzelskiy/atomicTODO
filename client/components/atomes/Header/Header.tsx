import * as React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';

const Header = (): JSX.Element => (
  <header className="header">
    <Link to="/">/</Link>
    <Link to="/ru">/ru</Link>
    <Link to="/en">/en</Link>
    <Link to="/unknown">/en</Link>
  </header>
);

export default Header;
