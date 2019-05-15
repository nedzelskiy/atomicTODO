import ClientTranslationsDtoWithFiles
  from '../ClientTranslationsDto/bindings/TranslationsWithFiles';
import { ServerTranslationsForLocale, ServerTranslationsDto }
  from '../ServerTranslationsDto/ServerTranslationsDto';
import ClientTranslationsDto, { ClientTranslationsForLocale }
  from '../ClientTranslationsDto/ClientTranslationsDto';

export interface ClientServerTranslationsFormats {
  getClientTranslationsDto(): ClientTranslationsDto;

  getServerTranslationsDto(): ServerTranslationsDto;

  getServerTranslationsForLocale(locale: string): ServerTranslationsForLocale | {};

  getClientTranslationsForLocale(locale: string): ClientTranslationsForLocale | {};
}

class TranslationsConnector implements ClientServerTranslationsFormats {
  private readonly clientTranslationsDto: ClientTranslationsDtoWithFiles;
  private readonly serverTranslationsDto: ServerTranslationsDto;

  constructor(
    clientTranslationsDto: ClientTranslationsDtoWithFiles,
    serverTranslationsDto: ServerTranslationsDto,
  ) {
    this.serverTranslationsDto = serverTranslationsDto;
    this.clientTranslationsDto = clientTranslationsDto;
  }

  getClientTranslationsForLocale(locale: string): ClientTranslationsForLocale | {} {
    const translations = this.clientTranslationsDto.readTranslationsFile(locale);
    if (!translations) {
      return {};
    }
    this.clientTranslationsDto.setTranslations(locale, translations);
    return translations;
  }

  getClientTranslationsDto(): ClientTranslationsDto {
    return this.clientTranslationsDto;
  }

  getServerTranslationsDto(): ServerTranslationsDto {
    return this.serverTranslationsDto;
  }

  getServerTranslationsForLocale(locale: string): ServerTranslationsForLocale | {} {
    return {};
  }
}

export default TranslationsConnector;
