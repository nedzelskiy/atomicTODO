export interface FileSystemConnector {
  readJSON(path: string): any | never;
  readFile(path: string): string | Buffer;
}

export interface CachedConnector {
  clearCache(): void;
  deletePathFromCache(path: string): void;
  getFromCache(path: string, fallbackGetter: Function): any | never;
}
