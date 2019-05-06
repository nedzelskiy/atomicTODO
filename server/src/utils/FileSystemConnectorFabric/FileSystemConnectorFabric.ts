import * as fs from 'fs';

import RealFileSystemConnector from './bindings/RealFileSystemConnector';

class FileSystemConnectorFabric {
  static getConnector(fileSystemDescriptor: any): FileSystemConnector {
    switch (fileSystemDescriptor) {
      case fs:
        return new RealFileSystemConnector();

      default:
        throw new Error(`Unknown filesystem descriptor: ${ fileSystemDescriptor }`);
    }
  }
}

export default FileSystemConnectorFabric;

export interface FileSystemConnector {
  readJSON(path: string): Object | Error;
  readFile(path: string): string | Error;
}
