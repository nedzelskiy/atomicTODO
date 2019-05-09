import { matchPath } from 'react-router-dom';
import { compile } from 'path-to-regexp';
import { NormalizedIncomingMessage } from '../../server';
import { HomeRouteParams, ReactRoute, ReactRouteWithMatchedParams, RouterMatch }
  from '../../../client/containers/App/app.routes';

export default class Environment {
  private readonly routes: ReactRoute[];

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

  createUrlByPageName(pageName: string, routeParams: any): string | null {
    try {
      const route: ReactRoute | undefined = this.getRouteByPageName(pageName);
      if (!route) {
        return null;
      }
      const path: string = (route as ReactRoute).path;
      return compile(path)(routeParams);
    } catch (err) {
      return null;
    }
  }

  getRouteByPageName(pageName: string): ReactRoute | undefined {
    return this.routes.find((r) => {
      return r.pageName === pageName;
    });
  }

  getMatchedRouteWithParams(url: string): ReactRouteWithMatchedParams {
    let route: ReactRoute = this.routes[0];
    let match: RouterMatch = {
      params: {},
    };

    const result: boolean = this.routes.some((r) => {
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
      match = m;
      return true;
    });

    if (!result) {
      route = <ReactRoute>this.getRouteByPageName('not-found');
    }

    return {
      ...route,
      url,
      match,
    };
  }

  constructor(routes: ReactRoute[]) {
    this.routes = routes;
  }
}
