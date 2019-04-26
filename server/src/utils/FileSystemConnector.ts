import { normalize } from 'path';
import { TranslationsForLocale } from '../../../common/interfaces';

interface FileSystemDescriptor {
  readFileSync(pathToFile: string, encoding: string): string;
}

class FileSystemConnector {
  private readonly fsd: FileSystemDescriptor;

  constructor(fsd: FileSystemDescriptor) {
    this.fsd = fsd;
  }

  readJSON(path: string): TranslationsForLocale | Error {
    return JSON.parse(
      this.fsd.readFileSync(normalize(`${path}.json`), 'utf-8'),
    );
  }
}

export default FileSystemConnector;
