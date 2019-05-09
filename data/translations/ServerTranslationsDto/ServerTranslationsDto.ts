import loggerFacade from '../../../server/utils/Logger/LoggerFacade';
import { FileSystemConnector, WithFileSystemConnector }
  from '../../../server/utils/FileSystemConnectorFabric/FileSystemConnectorFabric';
import { LocalizedTranslationsFormat } from '../trnaslations.interfaces';

export interface WithTranslationFiles {
  readTranslationsFile(locale: string): any;
}

export interface ServerTranslationsForLocale {}

export class ServerTranslationsDto
  implements
    WithFileSystemConnector,
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

  private readonly fsc: FileSystemConnector;

  constructor(fileSystemConnector: FileSystemConnector) {
    this.fsc = fileSystemConnector;
  }

  getFileSystemConnector(): FileSystemConnector {
    return this.fsc;
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
