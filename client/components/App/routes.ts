import { FunctionComponent } from 'react';
import { RouteProps } from 'react-router';
import TodoItemCreator from '../molecules/TodoItemCreator/TodoItemCreator';

export interface ReactRoute extends RouteProps {
  pageName: string;
  getComponent(): FunctionComponent;
}

const routes: ReactRoute[] = [
  {
    exact: true,
    path: '/:language',
    pageName: 'home',
    getComponent: () => TodoItemCreator,
  },
];

export default routes;
