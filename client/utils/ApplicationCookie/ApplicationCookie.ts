import Cookie from '../Cookie/Cookie';
import ClientEnvironment from '../ClientEnvironment/ClientEnvironment';

export interface AppCookieInterface {
  getThemeCookie(): string | undefined;
  getLocaleCookie(): string | undefined;
  setThemeCookieIfNew(theme: string): void;
  setLocaleCookieIfNew(locale: string): void;
}

class ApplicationCookie extends Cookie implements AppCookieInterface {
  constructor() {
    super();
    this.setThemeCookieIfNew = this.setThemeCookieIfNew.bind(this);
    this.setLocaleCookieIfNew = this.setLocaleCookieIfNew.bind(this);
  }

  setLocaleCookie(locale: string): void {
    super.set('locale', locale, '', ClientEnvironment.maxAgeForLangCookie);
  }

  getLocaleCookie(): string | undefined {
    return super.get('locale');
  }

  setLocaleCookieIfNew(locale: string): void {
    if (this.getLocaleCookie() !== locale) {
      this.setLocaleCookie(locale);
    }
  }

  setThemeCookie(theme: string): void {
    super.set('theme', theme, '', ClientEnvironment.maxAgeForThemeCookie);
  }

  getThemeCookie(): string | undefined {
    return this.get('theme');
  }

  setThemeCookieIfNew(theme: string): void {
    if (this.getThemeCookie() !== theme) {
      this.setThemeCookie(theme);
    }
  }
}

export default ApplicationCookie;
