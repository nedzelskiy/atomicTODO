import FileSystemReader from './FileSystemReader';
import { TranslationsForLocale } from '../../../common/interfaces';

export class TranslationsHelper {
  private readonly fileSystemReader: FileSystemReader;

  constructor(fileSystemReader: FileSystemReader) {
    this.fileSystemReader = fileSystemReader;
  }

  getTranslationsForLocale(locale: string): TranslationsForLocale | {} {
    try {
      return this.fileSystemReader.readJSON(`${process.env.PWD}/server/src/i18n/${locale}`);
    } catch (e) {
      console.log(e);
      return {};
    }
  }
}

export default new TranslationsHelper(new FileSystemReader());
