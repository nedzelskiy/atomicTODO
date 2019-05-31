import { CookiesStatic } from 'js-cookie';

interface CookieApi {
  get(key: string): string | undefined;
  set(key: string, value: string, domain?: string, hours?: number, path?: string): void;
  remove(key: string, domain?: string): void;
}

abstract class Cookie implements CookieApi {
  private readonly cookiesProvider: CookiesStatic;

  protected constructor() {
    this.cookiesProvider = require('js-cookie');
  }

  get(key: string): string | undefined {
    return this.cookiesProvider.get(key);
  }

  remove(key: string, domain?: string): void {
    const removeOptions: any = {};
    if (domain) {
      removeOptions.domain = domain;
    }
    this.cookiesProvider.remove(key, removeOptions);
  }

  set(key: string, value: string, domain?: string, hours?: number, path?: string): void {
    const options: any = { path, domain };
    if (hours) {
      options.expires = hours / 24;
    }
    this.cookiesProvider.set(key, value, options);
  }
}

export default Cookie;
