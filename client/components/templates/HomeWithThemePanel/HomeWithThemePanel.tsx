import * as React from 'react';
import Header from '../../atomes/Header/Header';
import TodoListWithControlsContainer
  from '../../../containers/lists/TodoListWithControlsContainer/TodoListWithControlsContainer';
import ChangeThemePanel from '../../molecules/ChangeThemePanel/ChangeThemePanel';

const HomeWithThemePanel: React.FunctionComponent<{}> = (): JSX.Element => (
  <div className="main-template wrapper">
    <Header/>
    <ChangeThemePanel />
    <TodoListWithControlsContainer />
  </div>
);

export default HomeWithThemePanel;
