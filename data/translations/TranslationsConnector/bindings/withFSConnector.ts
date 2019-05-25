import TranslationsConnector from '../TranslationsConnector';
import ClientTranslationsWithFiles
  from '../../ClientTranslationsDto/bindings/TranslationsWithFiles';
import cachedRFSConnector
  from '../../../../server/utils/connectors/CacheRFSConnector/bindings/cachedRFSConnector';
import { ServerTranslationsDto } from '../../ServerTranslationsDto/ServerTranslationsDto';

export default new TranslationsConnector(
  new ClientTranslationsWithFiles(
    cachedRFSConnector,
  ),
  new ServerTranslationsDto(
    cachedRFSConnector,
  ),
);
