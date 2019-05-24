import Home, { meta as HomePageMeta } from '../../pages/Home/Home';
import Test from '../../pages/Test/Test';
import { ApplicationRoutes } from './interfaces';

const defaultPageRoutes: ApplicationRoutes = {
  home: {
    exact: true,
    path: '/:locale',
    pageName: 'home',
    getComponent: () => Home,
    meta: HomePageMeta,
  },
  homeHeaderLess: {
    exact: true,
    path: '/:locale/without-header',
    pageName: 'home',
    getComponent: () => Home,
    pageComponentProps: {
      header: null,
    },
    meta: HomePageMeta,
  },
  test: {
    exact: true,
    path: '/:locale/test',
    pageName: 'test',
    getComponent: () => Test,
    meta: {
      title: '',
    },
  },
};

export default defaultPageRoutes;

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
