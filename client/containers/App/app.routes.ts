import { FunctionComponent, ComponentClass } from 'react';
import { RouteProps } from 'react-router';
import MainPage from '../pages/HomePage/HomePage';

export interface ReactRoute extends RouteProps {
  pageName: string;
  getComponent(): FunctionComponent<any> | ComponentClass<any, any>;
}

const appRoutes: ReactRoute[] = [
  {
    exact: true,
    path: '/:locale',
    pageName: 'home',
    getComponent: () => MainPage,
  },
];

export default appRoutes;

export interface HomeRouteParams {
  locale: string;
}
