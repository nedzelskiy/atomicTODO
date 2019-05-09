import { ServerResponse } from 'http';
import { NormalizedIncomingMessage, ResponseData } from '../server';
import withFilesFromRealFs
  from '../../data/translations/TranslationsConnector/bindings/withFilesFromRealFs';
import { ClientTranslationsForLocale }
  from '../../data/translations/ClientTranslationsDto/ClientTranslationsDto';

export default (req: NormalizedIncomingMessage, res: ServerResponse): void => {
  res.statusCode = 404;
  const locale: string = <string>req.url.split('/').pop();
  const translations: ClientTranslationsForLocale | null =
    withFilesFromRealFs.getClientTranslationsForLocale(locale);
  let response: ResponseData = {
    success: false,
    data: null,
  };
  if (translations) {
    res.statusCode = 200;
    response = {
      success: true,
      data: translations,
    };
  }
  return res.end(JSON.stringify(response));
};
