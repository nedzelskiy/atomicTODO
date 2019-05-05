import loggerFacade from '../../../server/src/utils/Logger/LoggerFacade';
import { FileSystemConnector }
  from '../../../server/src/utils/FileSystemConnectorFabric/FileSystemConnectorFabric';
import { BrowserTranslationsForLocale } from '../BrowsersTranslator/BrowsersTranslator';

export interface ServerTranslationsFormat {
  getBrowserTranslationsForLocale(locale: string): BrowserTranslationsForLocale | {};
}

export class ServerTranslator implements ServerTranslationsFormat {
  private readonly fsc: FileSystemConnector;

  constructor(fileSystemConnector: FileSystemConnector) {
    this.fsc = fileSystemConnector;
  }

  getBrowserTranslations(path: string): BrowserTranslationsForLocale | {} {
    try {
      return this.fsc.readJSON(path);
    } catch (e) {
      loggerFacade.log(e);
      return {};
    }
  }

  getBrowserTranslationsForLocale(locale: string) {
    return this.getBrowserTranslations(
      `${process.env.PWD}/data/translations/browserTranslations/${locale}`,
    );
  }
}

export default ServerTranslator;
