import Home, { meta as HomePageMeta } from '../../pages/Home/Home';
import Test from '../../pages/Test/Test';
import { ApplicationRoutes } from './interfaces';
import NotFound from '../../pages/NotFound/NotFound';

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
  notFound: {
    path: '*',
    pageName: 'not-found',
    getComponent: () => NotFound,
    meta: {
      title: '',
    },
  },
};

export default defaultPageRoutes;
