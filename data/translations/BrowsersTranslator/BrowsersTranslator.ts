import * as get from 'get-value';

export interface BrowserTranslations {
  [locale: string]: TranslationsForLocale;
}

interface TranslationsForLocale {
  [domain: string]: {
    [propName: string]: string;
  };
}

export interface BrowserTranslationsForLocale extends TranslationsForLocale {}

interface LocalizedTranslationsFormat {
  isExistTranslations(locale: string): boolean;
  getTranslations(locale: string): TranslationsForLocale;
  translate(locale: string, id: string, domain?: string): string;
  setTranslations(locale: string, translationsForLocale: TranslationsForLocale): void;
}

class BrowsersTranslator implements LocalizedTranslationsFormat {
  static readonly defaultDomain = 'common';
  private readonly translations: BrowserTranslations = {};

  constructor(locale: string | null = null, translationsForLocale: TranslationsForLocale = {}) {
    if (locale) {
      this.setTranslations(locale, translationsForLocale);
    }
    this.translate = this.translate.bind(this);
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

  translate(locale: string, id: string, domain: string = BrowsersTranslator.defaultDomain): string {
    const translatedString = get(this.translations, `${locale}.${domain}.${id}`);
    if (translatedString) {
      return translatedString;
    }
    return id;
  }
}

export default BrowsersTranslator;
