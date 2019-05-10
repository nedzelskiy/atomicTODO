import * as React from 'react';
import { Link } from 'react-router-dom';
import ChangeLocaleBtn from '../../../containers/buttons/ChangeLocaleBtn/ChangeLocaleBtn';
import './header.styles.scss';

let i = 0;

const Header = (): JSX.Element => (
  <header className="header">
    <Link to="/">/ {i++}</Link>
    <ChangeLocaleBtn locale="ru" />
    <ChangeLocaleBtn locale="en" />
    <ChangeLocaleBtn locale="zh" />
    <ChangeLocaleBtn locale="fi-FI" />
    <Link to="/unknown">/unknown {i++}</Link>
    <Link to="/ru/theme">/ru/theme</Link>
    <Link to="/ru">/ru</Link>
    <Link to="/zh">/zh</Link>
      <div>{i++}</div>
  </header>
);

export default Header;
