import * as React from 'react';
import { Link } from 'react-router-dom';
import ChangeLocaleBtn from '../../../containers/buttons/ChangeLocaleBtn/ChangeLocaleBtn';
import './header.styles.scss';

const Header = (): JSX.Element => (
  <header className="header">
    <Link to="/">/</Link>
    <ChangeLocaleBtn locale="ru" />
    <ChangeLocaleBtn locale="en" />
    <ChangeLocaleBtn locale="zh" />
    <ChangeLocaleBtn locale="fi-FI" />
    <Link to="/unknown">/unknown</Link>
  </header>
);

export default Header;
