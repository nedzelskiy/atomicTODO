import RealFileSystemConnector from '../RealFileSystemConnector/RealFileSystemConnector';
import { CachedConnector, FileSystemConnector } from '../interfaces';

class CacheRFSConnector
  extends RealFileSystemConnector
  implements FileSystemConnector, CachedConnector {
  private cached: object;

  constructor() {
    super();
    this.clearCache();
  }

  getFromCache(path: string, fallbackGetter: Function) {
    if (!this.cached[path]) {
      this.cached[path] = fallbackGetter(path);
    }
    return this.cached[path];
  }

  clearCache() {
    this.cached = {};
  }

  deletePathFromCache(path: string): void {
    delete this.cached[path];
  }

  readJSON(path: string): any | never {
    return this.getFromCache(path, super.readJSON);
  }

  readFile(path: string): string | never {
    return this.getFromCache(path, super.readFile);
  }
}

export default CacheRFSConnector;
