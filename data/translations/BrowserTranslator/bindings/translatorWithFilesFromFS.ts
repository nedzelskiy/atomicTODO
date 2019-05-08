import TranslatorWithFiles from './TranslatorWithFiles';
import RealFileSystemConnector
  from '../../../../server/utils/FileSystemConnectorFabric/bindings/RealFileSystemConnector';

export default new TranslatorWithFiles(new RealFileSystemConnector());
