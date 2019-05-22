import { RouteProps } from 'react-router-dom';
import { ReactComponent } from '../../utils/interfaces';
import HomePage, { meta as HomePageMeta } from '../../containers/pages/HomePage/HomePage';
import TestPage from '../../containers/pages/TestPage/TestPage';

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
  test: {
    exact: true,
    path: '/:locale/test',
    pageName: 'test',
    getComponent: () => TestPage,
    meta: {
      title: '',
    },
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
