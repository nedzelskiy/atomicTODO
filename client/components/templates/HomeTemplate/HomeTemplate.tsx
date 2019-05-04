import * as React from 'react';
import Header from '../../atomes/Header/Header';
import TodoListWithControls
  from '../../../containers/lists/TodoListWithControls/TodoListWithControls';
import './home.template.styles.scss';

const HomeTemplate = (): JSX.Element => (
  <div className="main-template wrapper">
    <Header/>
    <TodoListWithControls />
  </div>
);

export default HomeTemplate;
