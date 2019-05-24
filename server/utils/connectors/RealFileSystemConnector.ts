import { normalize } from 'path';
import { readFileSync } from 'fs';
import { FileSystemConnector } from './interfaces';

class RealFileSystemConnector implements FileSystemConnector {
  readJSON(path: string): any | never {
    return JSON.parse(
      readFileSync(normalize(`${path}.json`), 'utf-8'),
    );
  }

  readFile(path: string): string {
    return readFileSync(normalize(path), 'utf-8');
  }
}

export default RealFileSystemConnector;
