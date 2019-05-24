import loggerFacade from '../../../server/utils/Logger/LoggerFacade';
import { LocalizedTranslationsFormat } from '../trnaslations.interfaces';
import { FileSystemConnector } from '../../../server/utils/connectors/interfaces';

export interface WithTranslationFiles {
  readTranslationsFile(locale: string): any;
}

export interface ServerTranslationsForLocale {}

export class ServerTranslationsDto
  implements
    WithTranslationFiles,
    LocalizedTranslationsFormat
{
  setTranslations(locale: string, translationsForLocale: any): void {
    throw new Error('Method not implemented.');
  }

  getTranslations(locale: string) {
    throw new Error('Method not implemented.');
  }

  isExistTranslations(locale: string): boolean {
    throw new Error('Method not implemented.');
  }

  // private readonly fsc: FileSystemConnector;

  constructor(fileSystemConnector: FileSystemConnector) {
    // this.fsc = fileSystemConnector;
  }

  readTranslationsFile(locale: string): null {
    try {
      // return this.fsc.readJSON(path);
      return null;
    } catch (e) {
      loggerFacade.log(e);
      return null;
    }
  }
}

export default ServerTranslationsDto;
