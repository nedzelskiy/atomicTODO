import TranslationsWithFiles from './TranslationsWithFiles';
import RealFileSystemConnector
  from '../../../../server/utils/connectors/RealFileSystemConnector';

export default new TranslationsWithFiles(new RealFileSystemConnector());
