import staticHandler from './handlers/static';
import applicationHandler from './handlers/application';
import missedLanguageHandler from './handlers/missedLanguage';
import { NormalizedIncomingMessage } from '../../common/interfaces';
import { Server, createServer, ServerResponse, IncomingMessage } from 'http';

const SERVER_PORT: number = 8080;
const SERVER_URL: string = `http://localhost:${SERVER_PORT}`;

const server: Server = createServer();

server
  .on('request', (req: IncomingMessage, res: ServerResponse): void => {
    if (!req.url) {
      return res.end();
    }
    if (req.url === '/') {
      return missedLanguageHandler(<NormalizedIncomingMessage>req, res);
    }
    return req.url.indexOf('/static/') > -1 || req.url === '/favicon.ico'
      ? staticHandler(<NormalizedIncomingMessage>req, res)
      : applicationHandler(<NormalizedIncomingMessage>req, res);
  })
  .listen(SERVER_PORT, () => console.log(`==> SERVER STARTED on ${SERVER_URL}`));
