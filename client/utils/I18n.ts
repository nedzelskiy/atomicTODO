import { Translations, TranslationsForLocale } from '../../common/interfaces';

class I18n {
  private readonly translations: Translations = {};

  constructor(locale: string, translationsForLocale: TranslationsForLocale) {
    this.setTranslationsForLocale(locale, translationsForLocale);
  }

  setTranslationsForLocale(locale: string, translationsForLocale: TranslationsForLocale) {
    this.translations[locale] = translationsForLocale;
  }

  getTranslationsForLocale(locale: string) {
    return this.translations[locale];
  }
}

export default I18n;
