import * as React from 'react';
import { Link } from 'react-router-dom';
import ChangeLocale from '../../../containers/links/ChangeLocale';
import './header.styles.scss';

const Header = (): JSX.Element => (
  <header className="header">
    <Link to="/">/</Link>
    <ChangeLocale locale="ru" />
    <Link to="/en">/en</Link>
    <Link to="/unknown">/unknown</Link>
  </header>
);

export default Header;
