import { compile } from 'path-to-regexp';
import { matchPath } from 'react-router-dom';
import { NormalizedIncomingMessage } from '../../server';
import {
  HomeRouteParams,
  ApplicationRoute,
  ApplicationRoutes,
  ReactRouteWithMatchedParams,
} from '../../../client/containers/Router/interfaces';
import ApplicationConfig from '../ApplicationConfig/ApplicationConfig';

export interface WithNodeRequest {
  getNodeRequest(): NormalizedIncomingMessage;
}

export interface WithApplicationsRoutes {
  getMatchedRouteWithParams(): ReactRouteWithMatchedParams;
  createUrlByRouteId(routeId: string, routeParams: any): string | null;
}

export default class Environment
  extends ApplicationConfig
  implements WithNodeRequest, WithApplicationsRoutes {
  private currentLocale: string;
  private readonly routes: ApplicationRoutes;
  private readonly req: NormalizedIncomingMessage;
  private matchedRoute: ReactRouteWithMatchedParams;

  private getLocaleFromReq(): string {
    return Environment.getCheckedLocale(this.req.url.split('/')[1]);
  }

  constructor(
    req: NormalizedIncomingMessage,
    routes: ApplicationRoutes,
  ) {
    super();
    this.req = req;
    this.routes = routes;
    this.createUrlByRouteId = this.createUrlByRouteId.bind(this);
  }

  getLocale(): string {
    if (!this.currentLocale) {
      this.currentLocale = this.getLocaleFromReq();
    }
    return this.currentLocale;
  }

  getNodeRequest(): NormalizedIncomingMessage {
    return this.req;
  }

  createUrlByRouteId(routeId: string, routeParams: any): string | null {
    try {
      const route: ApplicationRoute | undefined = this.routes[routeId];
      if (!route) {
        return null;
      }
      const path: string = (route as ApplicationRoute).path;
      return compile(path)(routeParams);
    } catch (err) {
      return null;
    }
  }

  getMatchedRouteWithParams(): ReactRouteWithMatchedParams {
    if (this.matchedRoute) {
      return this.matchedRoute;
    }
    const url = this.req.url;
    let route: ApplicationRoute = this.routes[0];
    let routerParams = {};
    let routeId = '';

    const result: boolean = Object.keys(this.routes).some((id) => {
      const r = this.routes[id];
      const m = matchPath(url, r);
      if (!m || !m.params) {
        return false;
      }
      const { params } = m;
      const locale: string = (params as HomeRouteParams).locale;
      if (!locale || !Environment.isAcceptedLocale(locale)) {
        return false;
      }
      route = r;
      routeId = id;
      routerParams = m.params;
      return true;
    });

    if (!result) {
      routeId = 'notFound';
      route = this.routes[routeId];
    }
    this.matchedRoute = {
      ...route,
      url,
      routerParams,
      id: routeId,
    };
    return this.matchedRoute;
  }
}
