import { RouteProps, Redirect } from 'react-router-dom';
import { FunctionComponent, ComponentClass, createElement, ReactElement} from 'react';
import MainPage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import Environment from '../../../server/utils/Environment/Environment';

export interface ReactRoute extends RouteProps {
  path: string;
  pageName: string;
  getComponent(): FunctionComponent<any> | ComponentClass<any, any>| ReactElement;
}

export interface RouterMatch {
  params: any;
}

export interface ReactRouteWithMatchedParams extends ReactRoute {
  url: string;
  match: RouterMatch;
}

const appRoutes: ReactRoute[] = [
  {
    exact: true,
    path: '/:locale',
    pageName: 'home',
    getComponent: () => MainPage,
  },
  {
    exact: true,
    path: '/',
    pageName: 'missed-locale',
    getComponent: () => createElement(
      'div',
      {
        to: `/${Environment.defaultLocale}`,
      },
      Redirect,
    ),
  },
  {
    path: '*',
    pageName: 'not-found',
    getComponent: () => NotFoundPage,
  },
];

export default appRoutes;

export interface HomeRouteParams {
  locale: string;
}
