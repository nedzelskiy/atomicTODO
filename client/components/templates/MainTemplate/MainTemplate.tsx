import * as React from 'react';
import Header from '../../atomes/Header/Header';
import TodoList from '../../organismes/TodoList/TodoList';
import './main.template.styles.scss';

const MainTemplate = (): JSX.Element => (
  <div className="main-template wrapper">
    <Header/>
    <TodoList />
  </div>
);

export default MainTemplate;
