import ClientTranslationsDto, { ClientTranslationsForLocale }
  from '../ClientTranslationsDto';
import { WithTranslationFiles } from '../../ServerTranslationsDto/ServerTranslationsDto';
import { FileSystemConnector, WithFileSystemConnector }
  from '../../../../server/utils/FileSystemConnectorFabric/FileSystemConnectorFabric';

class ClientTranslationsWithFiles
  extends ClientTranslationsDto
  implements WithFileSystemConnector, WithTranslationFiles
{
  private readonly fsc: FileSystemConnector;

  constructor(fileSystemConnector: FileSystemConnector) {
    super();
    this.fsc = fileSystemConnector;
  }

  readTranslationsFile(locale: string): ClientTranslationsForLocale | null {
    try {
      return this.fsc.readJSON(
        `${process.env.PWD}/data/translations/files/client/${locale}`,
      );
    } catch (e) {
      return null;
    }
  }

  getFileSystemConnector(): FileSystemConnector {
    return this.fsc;
  }
}

export default ClientTranslationsWithFiles;
