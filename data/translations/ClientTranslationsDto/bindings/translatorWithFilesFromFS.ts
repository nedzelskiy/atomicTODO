import TranslationsWithFiles from './TranslationsWithFiles';
import RealFileSystemConnector
  from '../../../../server/utils/connectors/RealFileSystemConnector/RealFileSystemConnector';

export default new TranslationsWithFiles(new RealFileSystemConnector());
