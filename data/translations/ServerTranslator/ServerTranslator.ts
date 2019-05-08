import loggerFacade from '../../../server/utils/Logger/LoggerFacade';
import { FileSystemConnector, WithFileSystemConnector }
  from '../../../server/utils/FileSystemConnectorFabric/FileSystemConnectorFabric';

interface ServerTranslationsFormat {}

export interface WithTranslationFiles {
  readTranslationsFile<T>(locale: string): T | null;
}

export interface ServerTranslationsForLocale {}

export class ServerTranslator
  implements ServerTranslationsFormat, WithFileSystemConnector, WithTranslationFiles
{
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

export default ServerTranslator;
