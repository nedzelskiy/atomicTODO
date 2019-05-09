import { RouteProps, Redirect } from 'react-router-dom';
import { FunctionComponent, ComponentClass, createElement, ReactElement } from 'react';
import MainPage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import Environment from '../../../server/utils/Environment/Environment';

export interface RouteMeta {
  title: string;
}

export interface ReactRoute extends RouteProps {
  path: string;
  pageName: string;
  meta: RouteMeta;

  getComponent(): FunctionComponent<any> | ComponentClass<any, any> | ReactElement;
}

export interface RouterMatch {
  params: any;
}

export interface ReactRouteWithMatchedParams extends ReactRoute {
  url: string;
  match: RouterMatch;
}

export interface AppRoutes {
  [pageName: string]: ReactRoute;
}

const appRoutes: AppRoutes = {
  home: {
    exact: true,
    path: '/:locale',
    pageName: 'home',
    getComponent: () => MainPage,
    meta: {
      title: 'This is an atomic TODO app',
    },
  },
  'missed-locale': {
    exact: true,
    path: '/',
    pageName: 'missed-locale',
    meta: {
      title: '',
    },
    getComponent: () => createElement(
      'div',
      {
        to: `/${Environment.defaultLocale}`,
      },
      Redirect,
    ),
  },
  'not-found': {
    path: '*',
    pageName: 'not-found',
    getComponent: () => NotFoundPage,
    meta: {
      title: '',
    },
  },
};

export default appRoutes;

export interface HomeRouteParams {
  locale: string;
}
