import { readFileSync } from 'fs';
import RenderHtml from '../utils/RenderHtml';
import { IncomingMessage, ServerResponse } from 'http';

export default (req: IncomingMessage, res: ServerResponse): void => {
  if (req.url !== '/' && req.url !== '/only-client-render') {
    res.statusCode = 404;
    return res.end('Not found');
  }

  res.statusCode = 200;

  if (req.url === '/only-client-render') {
    const html: string = readFileSync('html-test.html', 'UTF-8');
    return res.end(html);
  }

  const render: RenderHtml = new RenderHtml();
  const html: string = render.getStringHTML();
  res.end(html);
};
