import { LocalizedTranslationsFormat } from '../trnaslations.interfaces';

interface ClientTranslations {
  [locale: string]: ClientTranslationsForLocale;
}

export interface ClientTranslationsForLocale {
  [domain: string]: {
    [id: string]: string;
  };
}

class ClientTranslationsDto implements LocalizedTranslationsFormat {
  private readonly translations: ClientTranslations = {};

  constructor() {
    this.setTranslations = this.setTranslations.bind(this);
    this.getTranslations = this.getTranslations.bind(this);
    this.isExistTranslations = this.isExistTranslations.bind(this);
  }

  setTranslations(locale: string, translationsForLocale: ClientTranslationsForLocale): void {
    this.translations[locale] = translationsForLocale;
  }

  isExistTranslations(locale: string): boolean {
    const translations = this.translations[locale];
    return (translations && Object.keys(translations).length !== 0);
  }

  getTranslations(locale: string): ClientTranslationsForLocale | {} {
    return this.isExistTranslations(locale)
      ? this.translations[locale]
      : {};
  }
}

export default ClientTranslationsDto;
