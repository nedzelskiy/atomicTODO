import * as React from 'react';
import Header from '../../atomes/Header/Header';
import TodoListWithControlsContainer
  from '../../../containers/lists/TodoListWithControlsContainer/TodoListWithControlsContainer';
import './home.template.styles.scss';

let i = 1;

const HomeTemplate = (): JSX.Element => (
  <div className="main-template wrapper">
    <Header/>
    <TodoListWithControlsContainer />
    <div>home template {i++}</div>
  </div>
);

export default HomeTemplate;
