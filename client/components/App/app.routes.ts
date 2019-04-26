import { FunctionComponent, ComponentClass } from 'react';
import { RouteProps } from 'react-router';
import TodoList from '../organismes/TodoList/TodoList';
import TodoItemCreator from '../molecules/TodoItemCreator/TodoItemCreator';

export interface ReactRoute extends RouteProps {
  pageName: string;
  getComponent(): FunctionComponent<any> | ComponentClass<any, any>;
}

const appRoutes: ReactRoute[] = [
  {
    exact: true,
    path: '/:language',
    pageName: 'home',
    getComponent: () => TodoList,
  },
];

export default appRoutes;
