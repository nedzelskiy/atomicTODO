import TranslationsConnector from '../TranslationsConnector';
import ClientTranslationsWithFiles
  from '../../ClientTranslationsDto/bindings/TranslationsWithFiles';
import RealFileSystemConnector
  from '../../../../server/utils/connectors/RealFileSystemConnector';
import { ServerTranslationsDto } from '../../ServerTranslationsDto/ServerTranslationsDto';

export default new TranslationsConnector(
  new ClientTranslationsWithFiles(
    new RealFileSystemConnector(),
  ),
  new ServerTranslationsDto(
    new RealFileSystemConnector(),
  ),
);
