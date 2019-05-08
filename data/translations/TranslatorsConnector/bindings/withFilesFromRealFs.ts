import TranslatorsConnector from '../TranslatorsConnector';
import BrowserTranslatorWithFiles from '../../BrowserTranslator/bindings/TranslatorWithFiles';
import RealFileSystemConnector
  from '../../../../server/utils/FileSystemConnectorFabric/bindings/RealFileSystemConnector';
import { ServerTranslator } from '../../ServerTranslator/ServerTranslator';

export default new TranslatorsConnector(
  new BrowserTranslatorWithFiles(
    new RealFileSystemConnector(),
  ),
  new ServerTranslator(
    new RealFileSystemConnector(),
  ),
);
