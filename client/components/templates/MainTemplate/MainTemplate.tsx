import * as React from 'react';
import Header from '../../atomes/Header/Header';
import TodoListWithControls
  from '../../../containers/lists/TodoListWithControls/TodoListWithControls';
import './main.template.styles.scss';

const MainTemplate = (): JSX.Element => (
  <div className="main-template wrapper">
    <Header/>
    <TodoListWithControls />
  </div>
);

export default MainTemplate;
