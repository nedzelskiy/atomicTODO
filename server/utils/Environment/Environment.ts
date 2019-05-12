import { matchPath } from 'react-router-dom';
import { compile } from 'path-to-regexp';
import { NormalizedIncomingMessage } from '../../server';
import {
  HomeRouteParams,
  ApplicationRoute,
  ApplicationRoutes,
  ReactRouteWithMatchedParams,
} from '../../../client/containers/Router/routes';

export default class Environment {
  private readonly routes: ApplicationRoutes;

  static defaultLocale: string = 'en';
  static defaultTheme: string = 'white';

  static getAllowedLocales(): Set<string> {
    return new Set()
      .add(Environment.defaultLocale)
      .add('ru')
      .add('zh')
      .add('fi-FI');
  }

  static getCheckedLocale(locale: string): string {
    return Environment.isAcceptedLocale(locale)
      ? locale
      : Environment.defaultLocale;
  }

  static isAcceptedLocale(locale: string): boolean {
    return Environment.getAllowedLocales().has(locale);
  }

  static getLocaleFromReq(req: NormalizedIncomingMessage): string {
    return Environment.getCheckedLocale(req.url.split('/')[1]);
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

  getMatchedRouteWithParams(url: string): ReactRouteWithMatchedParams {
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
    return {
      ...route,
      url,
      routerParams,
      id: routeId,
    };
  }

  constructor(routes: ApplicationRoutes) {
    this.routes = routes;
    this.createUrlByRouteId = this.createUrlByRouteId.bind(this);
  }
}
