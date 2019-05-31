import Test from '../../pages/Test/Test';
import { Redirect } from 'react-router-dom';
import { ApplicationRoutes } from './interfaces';
import NotFound from '../../pages/NotFound/NotFound';
import Home, { meta as HomePageMeta } from '../../pages/Home/Home';

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
    templateProps: {
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
  missingLocale: {
    exact: true,
    path: '/',
    pageName: 'missingLocale',
    getComponent: () => Redirect,
    meta: {
      title: '',
    },
  },
  notFound: {
    path: '/:locale/*',
    pageName: 'not-found',
    getComponent: () => NotFound,
    meta: {
      title: '',
    },
  },
};

export default defaultPageRoutes;
