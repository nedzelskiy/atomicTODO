import { readFileSync } from 'fs';
import RenderHtml from '../utils/RenderHtml';
import { IncomingMessage, ServerResponse } from 'http';

export default (req: IncomingMessage, res: ServerResponse): void => {
  if (!req.url) {
    return res.end();
  }

  res.statusCode = 200;

  if (req.url === '/only-client-render') {
    const html: string = readFileSync('html-test.html', 'UTF-8');
    return res.end(html);
  }

  if (req.url.indexOf('/get-translations/') > -1 && req.method === 'GET') {

  }

  if (req.url === '/') {
    const render: RenderHtml = new RenderHtml(req);
    const html: string = render.getStringHTML();
    return res.end(html);
  }

  res.statusCode = 404;
  return res.end('Not found');
};
