import { normalize } from 'path';
import { readFileSync } from 'fs';
import { FileSystemConnector } from '../FileSystemConnectorFabric';

class RealFileSystemConnector implements FileSystemConnector {
  readJSON(path: string): Object | Error {
    return JSON.parse(
      readFileSync(normalize(`${path}.json`), 'utf-8'),
    );
  }
}

export default RealFileSystemConnector;
