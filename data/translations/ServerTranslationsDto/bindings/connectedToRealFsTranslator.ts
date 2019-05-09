import FileSystemConnectorFabric
  from '../../../../server/utils/FileSystemConnectorFabric/FileSystemConnectorFabric';
import ServerTranslationsDto from '../ServerTranslationsDto';

export default new ServerTranslationsDto(
  FileSystemConnectorFabric.getConnector(require('fs')),
);
