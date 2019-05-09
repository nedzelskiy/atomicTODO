import * as get from 'get-value';
import { TranslateHelper } from '../trnaslations.interfaces';
import { ClientTranslationsForLocale } from '../ClientTranslationsDto/ClientTranslationsDto';

interface Translator {
  getTranslator(): TranslateHelper;
}

class ClientTranslator implements Translator {
  private static readonly defaultDomain = 'common';
  private readonly translations: ClientTranslationsForLocale = {};

  constructor(translations: ClientTranslationsForLocale) {
    this.translations = translations;
  }

  getTranslator(): TranslateHelper {
    return (id: string, domain: string = ClientTranslator.defaultDomain): string => {
      const translatedString = get(this.translations, `${domain}.${id}`);
      if (translatedString) {
        return translatedString;
      }
      return id;
    };
  }
}

export default ClientTranslator;
