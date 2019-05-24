import ClientTranslationsDto, { ClientTranslationsForLocale }
  from '../ClientTranslationsDto';
import { WithTranslationFiles } from '../../ServerTranslationsDto/ServerTranslationsDto';
import { FileSystemConnector } from '../../../../server/utils/connectors/interfaces';

class ClientTranslationsWithFiles
  extends ClientTranslationsDto
  implements WithTranslationFiles
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
}

export default ClientTranslationsWithFiles;
