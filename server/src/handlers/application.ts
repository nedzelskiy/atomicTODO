import { ServerResponse } from 'http';
import RenderHtml from '../utils/RenderHtml';
import configureStore from '../../../client/configureStore';
import translationsHelper from '../utils/TranslationsHelper';
import { NormalizedIncomingMessage } from '../../../common/interfaces';

export default (req: NormalizedIncomingMessage, res: ServerResponse): void => {
  res.statusCode = 200;

  if (req.url.indexOf('/get-translations/') > -1 && req.method === 'GET') {

  }

  const render: RenderHtml = new RenderHtml(req, configureStore(), translationsHelper);
  const responseString: string = render.getResponseString();
  return res.end(responseString);
};
