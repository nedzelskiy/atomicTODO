import BrowserTranslator from '../BrowserTranslator';
import { WithTranslationFiles } from '../../ServerTranslator/ServerTranslator';
import { FileSystemConnector, WithFileSystemConnector }
  from '../../../../server/utils/FileSystemConnectorFabric/FileSystemConnectorFabric';

class TranslatorWithFiles
  extends BrowserTranslator
  implements WithFileSystemConnector, WithTranslationFiles
{
  private readonly fsc: FileSystemConnector;

  constructor(fileSystemConnector: FileSystemConnector) {
    super();
    this.fsc = fileSystemConnector;
  }

  readTranslationsFile<BrowserTranslationsForLocale>(
    locale: string,
  ): BrowserTranslationsForLocale | null {
    try {
      return this.fsc.readJSON(
        `${process.env.PWD}/data/translations/browserTranslations/${locale}`,
      );
    } catch (e) {
      return null;
    }
  }

  getFileSystemConnector(): FileSystemConnector {
    return this.fsc;
  }
}

export default TranslatorWithFiles;
