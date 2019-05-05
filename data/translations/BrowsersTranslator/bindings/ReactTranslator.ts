import BrowsersTranslator from '../BrowsersTranslator';

export type TranslateHelper = (id: string, domain?: string) => string;

export interface BrowsersTranslateHelper {
  translate: TranslateHelper;
}

class ReactTranslator implements BrowsersTranslateHelper {
  private locale: string;
  private readonly translator: BrowsersTranslator;

  constructor(translator: BrowsersTranslator) {
    this.translator = translator;
  }

  setLocale(locale: string) {
    this.locale = locale;
  }

  translate(id: string, domain: string | undefined): string {
    return this.translator.translate.call(this, this.locale, id, domain);
  }
}

export default ReactTranslator;
