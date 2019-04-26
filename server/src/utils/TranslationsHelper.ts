import loggerFacade from './LoggerFacade';
import FileSystemConnector from './FileSystemConnector';
import { TranslationsForLocale } from '../../../common/interfaces';
import I18n, { I18nTranslator } from '../../../common/helpers/I18n';

export class TranslationsHelper {
  private readonly fsc: FileSystemConnector;
  private readonly i18n: I18n;

  constructor(fileSystemConnector: FileSystemConnector) {
    this.i18n = new I18n();
    this.fsc = fileSystemConnector;
  }

  getTranslationsFromFS(path: string): TranslationsForLocale | {} {
    try {
      return this.fsc.readJSON(path);
    } catch (e) {
      loggerFacade.log(e);
      return {};
    }
  }

  getTranslationsForLocale(locale: string): TranslationsForLocale | {} {
    this.i18n.setTranslationsForLocale(
      locale,
      this.getTranslationsFromFS(`${process.env.PWD}/server/src/i18n/${locale}`),
    );
    return <TranslationsForLocale | {}>this.i18n.getTranslationsForLocale(locale);
  }

  getTranslator(): I18nTranslator {
    return this.i18n.translate.bind(this.i18n);
  }
}

export default new TranslationsHelper(new FileSystemConnector(require('fs')));
