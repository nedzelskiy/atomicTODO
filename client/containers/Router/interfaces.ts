import { RouteProps } from 'react-router';
import { ReactComponent } from '../../utils/interfaces';

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
  componentProps?: any;
  templateProps?: any | {};
  getComponent(): ReactComponent;
}

export interface ApplicationRoutes {
  [routeId: string]: ApplicationRoute;
}
