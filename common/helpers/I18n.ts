import * as get from 'get-value';
import { Context, createContext } from 'react';
import { Translations, TranslationsForLocale, PureStringJson } from '../interfaces';

export interface I18nTranslator {
  (locale: string, id: string, domain?: string): string;
}

interface I18nClass {
  translate: I18nTranslator;
}

class I18n implements I18nClass {
  static context: Context<{}> = createContext({});

  private readonly translations: Translations = {};
  private routerParams: PureStringJson = {};

  constructor(locale: string | null = null, translationsForLocale: TranslationsForLocale = {}) {
    if (locale) {
      this.setTranslationsForLocale(locale, translationsForLocale);
    }
  }

  setRouterParams(routerParams: PureStringJson): void {
    this.routerParams = routerParams;
  }

  getRouterParam(paramName: string) {
    return this.routerParams[paramName];
  }

  setTranslationsForLocale(locale: string, translationsForLocale: TranslationsForLocale): void {
    this.translations[locale] = translationsForLocale;
  }

  isExistTranslationsForLocale(locale: string): boolean {
    return !!this.translations[locale];
  }

  getTranslationsForLocale(locale: string): TranslationsForLocale | undefined {
    return this.translations[locale];
  }

  translate(locale: string, id: string, domain?: string): string {
    return get(
      this.translations,
      `${locale}.${domain || 'common'}.${id}`,
    ) || id;
  }
}

export default I18n;
