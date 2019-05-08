import BrowserTranslatorWithFiles
  from '../BrowserTranslator/bindings/TranslatorWithFiles';
import { ServerTranslationsForLocale, ServerTranslator }
  from '../ServerTranslator/ServerTranslator';
import BrowserTranslator, { BrowserTranslationsForLocale }
  from '../BrowserTranslator/BrowserTranslator';
import { TranslateHelper } from '../../../client/containers/hocs/withTranslations';

export interface ClientServerTranslationsConnector {
  getBrowserTranslator(): BrowserTranslator;
  getServerTranslator(): ServerTranslator;
  getServerTranslationsForLocale(locale: string): ServerTranslationsForLocale | null;
  getBrowserTranslationsForLocale(locale: string): BrowserTranslationsForLocale | null;
}

class TranslatorsConnector implements ClientServerTranslationsConnector {
  private readonly browserTranslator: BrowserTranslatorWithFiles;
  private readonly serverTranslator: ServerTranslator;

  constructor(
    browserTranslatorWithFiles: BrowserTranslatorWithFiles,
    serverTranslator: ServerTranslator,
  ) {
    this.serverTranslator = serverTranslator;
    this.browserTranslator = browserTranslatorWithFiles;
    this.getBrowserTranslateHelper = this.getBrowserTranslateHelper.bind(this);
  }

  getBrowserTranslationsForLocale(locale: string): BrowserTranslationsForLocale | null {
    return this.browserTranslator.readTranslationsFile(locale);
  }

  getBrowserTranslateHelper(locale: string): TranslateHelper {
    return this.browserTranslator.translate.bind(this.browserTranslator, locale);
  }

  getBrowserTranslator(): BrowserTranslator {
    return this.browserTranslator;
  }

  getServerTranslator(): ServerTranslator {
    return this.serverTranslator;
  }

  getServerTranslationsForLocale(locale: string): ServerTranslationsForLocale | null {
    return null;
  }
}

export default TranslatorsConnector;
