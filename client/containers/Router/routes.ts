import { RouteProps } from 'react-router-dom';
import { ComponentClass, FunctionComponent } from 'react';
import HomePage, { meta as HomePageMeta } from '../../containers/pages/HomePage/HomePage';

const defaultPageRoutes: ApplicationRoutes = {
  home: {
    exact: true,
    path: '/:locale',
    pageName: 'home',
    getComponent: () => HomePage,
    meta: HomePageMeta,
  },
  homeHeaderLess: {
    exact: true,
    path: '/:locale/without-header',
    pageName: 'home',
    getComponent: () => HomePage,
    pageComponentProps: {
      header: null,
    },
    meta: HomePageMeta,
  },
};

export default defaultPageRoutes;

export interface HomeRouteParams {
  locale: string;
}

export interface ReactRouteWithMatchedParams extends ApplicationRoute {
  id: string;
  url: string;
  routerParams: any;
}

export interface RouteMeta {
  title: string;
}

export interface ApplicationRoute extends RouteProps {
  path: string;
  pageName: string;
  meta: RouteMeta;
  pageComponentProps?: any | {};
  getComponent(): ReactComponent;
}

export interface ApplicationRoutes {
  [routeId: string]: ApplicationRoute;
}

export type ReactComponent = FunctionComponent<any> | ComponentClass<any, any>;
// 'missed-locale': {
//   exact: true,
//   path: '/',
//   pageName: 'missed-locale',
//   meta: {
//     title: '',
//   },
//   getComponent: () => createElement(
//     'div',
//     {
//       to: `/${Environment.defaultLocale}`,
//     },
//     Redirect,
//   ),
// },
// // 'theme-panel': {
// //   exact: true,
// //   path: '/:locale/theme',
// //   pageName: 'theme-panel',
// //   getComponent: () => HomeWithoutHeader,
// //   meta: {
// //     title: '',
// //   },
// // },
// 'not-found': {
//   path: '*',
//   pageName: 'not-found',
//   getComponent: () => NotFoundPage,
//   meta: {
//     title: '',
//   },
// },
