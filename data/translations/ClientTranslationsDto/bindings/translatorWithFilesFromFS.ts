import TranslationsWithFiles from './TranslationsWithFiles';
import RealFileSystemConnector
  from '../../../../server/utils/FileSystemConnectorFabric/bindings/RealFileSystemConnector';

export default new TranslationsWithFiles(new RealFileSystemConnector());
