import { parse } from 'cookie';
import { compile } from 'path-to-regexp';
import { matchPath } from 'react-router-dom';
import {
  HomeRouteParams,
  ApplicationRoute,
  ApplicationRoutes,
  ReactRouteWithMatchedParams,
} from '../../../client/containers/Router/interfaces';
import { NormalizedIncomingMessage } from '../../interfaces';
import ApplicationConfig from '../ApplicationConfig/ApplicationConfig';

export interface WithApplicationsRoutes {
  getMatchedRouteWithParams(): ReactRouteWithMatchedParams;

  createUrlByRouteId(routeId: string, routeParams: any): string | null;
}

export default class ServerEnvironment extends ApplicationConfig implements WithApplicationsRoutes {
  private currentLocale: string;
  private readonly routes: ApplicationRoutes;
  private readonly req: NormalizedIncomingMessage;
  private matchedRoute: ReactRouteWithMatchedParams;

  private getLocaleFromUrl(): string | undefined {
    return this.req.url.split('/')[1];
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

  getDefaultTheme() {
    return ServerEnvironment.defaultTheme;
  }

  getLocaleFromHeaders(): string | undefined {
    return Array.from(ServerEnvironment.getAllowedLocales()).find((locale: string) => {
      return (this.req.headers['accept-language'] as string)
        .split(';')
        .filter((langPairs: string) => {
          return langPairs.toLowerCase().match(locale);
        },
      ).length > 0;
    });
  }

  getLocaleFromCookie(): string | undefined {
    return parse(this.req.headers.cookie || '').locale;
  }

  getLocale(): string {
    if (!this.currentLocale) {
      let locale = this.getLocaleFromUrl();
      if (!locale) {
        locale = this.getLocaleFromCookie();
      }
      if (!locale) {
        locale = this.getLocaleFromHeaders();
      }
      this.currentLocale = ServerEnvironment.getCheckedLocale(locale);
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
      if (!locale || !ServerEnvironment.isAcceptedLocale(locale)) {
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
