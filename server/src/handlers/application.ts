import { ServerResponse } from 'http';
import RenderHtml from '../utils/RenderHtml';
import { NormalizedIncomingMessage } from '../../../common/interfaces';

export default (req: NormalizedIncomingMessage, res: ServerResponse): void => {
  res.statusCode = 200;

  if (req.url.indexOf('/get-translations/') > -1 && req.method === 'GET') {

  }

  const render: RenderHtml = new RenderHtml(req);
  const html: string = render.getStringHTML();
  return res.end(html);

};
