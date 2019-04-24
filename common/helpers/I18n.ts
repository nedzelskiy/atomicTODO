import * as get from 'get-value';
import { Context, createContext } from 'react';
import { Translations, TranslationsForLocale } from '../interfaces';

class I18n {
  static context: Context<{}> = createContext({});

  private readonly translations: Translations = {};

  constructor(locale: string, translationsForLocale: TranslationsForLocale) {
    this.setTranslationsForLocale(locale, translationsForLocale);
  }

  setTranslationsForLocale(locale: string, translationsForLocale: TranslationsForLocale): void {
    if (locale) {
      this.translations[locale] = translationsForLocale;
    }
  }

  translate(locale: string, id: string, domain?: string): string {
    return get(
      this.translations,
      `${locale}.${domain || 'common'}.${id}`,
    ) || id;
  }
}

export default I18n;
