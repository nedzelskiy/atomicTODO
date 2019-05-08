import FileSystemConnectorFabric
  from '../../../../server/utils/FileSystemConnectorFabric/FileSystemConnectorFabric';
import ServerTranslator from '../ServerTranslator';

export default new ServerTranslator(
  FileSystemConnectorFabric.getConnector(require('fs')),
);
