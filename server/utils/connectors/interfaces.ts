export interface FileSystemConnector {
  readJSON(path: string): any | never;
  readFile(path: string): string | Buffer;
}
