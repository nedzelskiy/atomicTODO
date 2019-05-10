import { matchPath } from 'react-router-dom';
import { compile } from 'path-to-regexp';
import { NormalizedIncomingMessage } from '../../server';
import { AppRoutes, HomeRouteParams, ReactRoute, ReactRouteWithMatchedParams, RouterMatch }
  from '../../../client/containers/App/app.routes';

export default class Environment {
  private readonly routes: AppRoutes;

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

  compileReactPath(path: string, routeParams: any): string | null {
    try {
      return compile(path)(routeParams);
    } catch (e) {
      return null;
    }
  }

  createUrlByPageName(pageName: string, routeParams: any): string | null {
    const route: ReactRoute | undefined = this.routes[pageName];
    if (!route) {
      return null;
    }
    const path: string | string[] = (route as ReactRoute).path;
    if (typeof path === 'object') {
      let foundPath: null| string = null;
      path.some((p: string): boolean => {
        const compiledPath: null | string = this.compileReactPath(p, routeParams);
        if (compiledPath) {
          foundPath = compiledPath;
          return true;
        }
        return false;
      });
      return foundPath;
    }
    return path;
  }

  getMatchedRouteWithParams(url: string): ReactRouteWithMatchedParams {
    let route: ReactRoute = this.routes[0];
    let match: RouterMatch = {
      params: {},
    };

    const result: boolean = Object.keys(this.routes).some((pageName) => {
      const r = this.routes[pageName];
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
      route = this.routes['not-found'];
    }

    return {
      ...route,
      url,
      match,
    };
  }

  constructor(routes: AppRoutes) {
    this.routes = routes;
    this.createUrlByPageName = this.createUrlByPageName.bind(this);
  }
}
