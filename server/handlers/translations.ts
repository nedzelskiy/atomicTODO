import { ServerResponse } from 'http';
import { NormalizedIncomingMessage, ResponseData } from '../interfaces';
import ServerEnvironment from '../utils/ServerEnvironment/ServerEnvironment';
import { ClientTranslationsForLocale }
  from '../../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import withFSConnector
  from '../../data/translations/TranslationsConnector/bindings/withFSConnector';

export default (req: NormalizedIncomingMessage, res: ServerResponse): void => {
  res.statusCode = 404;
  const locale: string = <string>req.url.split('/').pop();
  const translations: ClientTranslationsForLocale | {} =
    withFSConnector.getClientTranslationsForLocale(locale);
  let response: ResponseData = {
    success: false,
    error: null,
  };
  if (translations && Object.keys(translations).length > 0) {
    res.setHeader('Cache-Control', `max-age=${ServerEnvironment.maxAgeForStatics}`);
    res.statusCode = 200;
    response = {
      success: true,
      data: translations,
    };
  }
  return res.end(JSON.stringify(response));
};
