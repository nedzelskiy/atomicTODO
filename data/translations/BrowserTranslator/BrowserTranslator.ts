import * as get from 'get-value';

export interface BrowserTranslations {
  [locale: string]: TranslationsForLocale;
}

type TranslationsForLocale = {
  [domain: string]: {
    [propName: string]: string;
  };
};

export type BrowserTranslationsForLocale = TranslationsForLocale;

interface LocalizedTranslationsFormat {
  isExistTranslations(locale: string): boolean;
  getTranslations(locale: string): TranslationsForLocale;
  translate(locale: string, id: string, domain?: string): string;
  setTranslations(locale: string, translationsForLocale: TranslationsForLocale): void;
}

class BrowserTranslator implements LocalizedTranslationsFormat {
  private static readonly defaultDomain = 'common';
  private static writeWatcher: Function = () => {};

  private readonly translations: BrowserTranslations = {};

  private readonly createTranslationsProxy() {
    this.translations = new Proxy({}, {
      get(target: any, prop) {
        return target[prop];
      },
      set(target, prop, value) {
        target[prop] = value;
        BrowserTranslator.writeWatcher(target, prop, value);
        return true;
      },
    });
  }

  static subscribeToUpdateTranslations(handler: Function) {
    this.writeWatcher = handler;
  }

  constructor() {
    this.createTranslationsProxy();
    this.translate = this.translate.bind(this);
    this.setTranslations = this.setTranslations.bind(this);
  }

  setTranslations(locale: string, translationsForLocale: TranslationsForLocale): void {
    this.translations[locale] = translationsForLocale;
  }

  isExistTranslations(locale: string): boolean {
    return !!this.translations[locale];
  }

  getTranslations(locale: string): TranslationsForLocale {
    return this.isExistTranslations(locale)
      ? this.translations[locale]
      : {};
  }

  translate(locale: string, id: string, domain: string = BrowserTranslator.defaultDomain): string {
    return get(
      this.translations,
      `${locale}.${domain}.${id}`,
    ) || id;
  }
}

export default BrowserTranslator;
