import { normalize } from 'path';

class FileSystemReader {
  readJSON(p: string) {
    return require(`${p}.json`);
  }
}

export default FileSystemReader;
