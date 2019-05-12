import * as React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';
import TestState from '../../../containers/TestState';

const Header = (): JSX.Element => (
  <header className="header">
    <TestState name="in-header" />
    <Link to="/ru">/ru</Link>
    <Link to="/en">/en</Link>
    <Link to="/ru/without-header">/ru/without-header</Link>
  </header>
);

export default Header;
