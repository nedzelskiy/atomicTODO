import { compile } from 'path-to-regexp';
import { matchPath } from 'react-router-dom';
import {
  HomeRouteParams,
  ApplicationRoute,
  ApplicationRoutes,
  ReactRouteWithMatchedParams,
} from '../../../client/containers/Router/interfaces';
import ApplicationConfig from '../ApplicationConfig/ApplicationConfig';

export interface WithApplicationsRoutes {
  getMatchedRouteWithParams(): ReactRouteWithMatchedParams;

  createUrlByRouteId(routeId: string, routeParams: any): string | null;
}

export default class Environment extends ApplicationConfig implements WithApplicationsRoutes {
  private currentLocale: string;
  private readonly currentUrl: string;
  private readonly routes: ApplicationRoutes;
  private matchedRoute: ReactRouteWithMatchedParams;

  private getLocaleFromUrl(): string {
    return Environment.getCheckedLocale(this.currentUrl.split('/')[1]);
  }

  constructor(
    currentUrl: string,
    routes: ApplicationRoutes,
  ) {
    super();
    this.routes = routes;
    this.currentUrl = currentUrl;
    this.createUrlByRouteId = this.createUrlByRouteId.bind(this);
  }

  getDefaultTheme() {
    return Environment.defaultTheme;
  }

  getLocale(): string {
    if (!this.currentLocale) {
      this.currentLocale = this.getLocaleFromUrl();
    }
    return this.currentLocale;
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
    const url = this.currentUrl;
    let route: ApplicationRoute = this.routes[0];
    let routerParams = {};
    let routeId = '';

    const result: boolean = Object.keys(this.routes).some((id) => {
      const r = this.routes[id];
      const m = matchPath(url, r);
      if (!m || !m.params) {
        return false;
      }
      const {params} = m;
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
