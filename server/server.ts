import staticHandler from './handlers/static';
import applicationHandler from './handlers/application';
import { NormalizedIncomingMessage } from './interfaces';
import translationsHandler from './handlers/translations';
import missedLocaleHandler from './handlers/missedLocale';
import { Server, createServer, ServerResponse, IncomingMessage } from 'http';
import RealFileSystemConnector
  from './utils/connectors/RealFileSystemConnector/RealFileSystemConnector';
import cachedRFSConnector from './utils/connectors/CacheRFSConnector/bindings/cachedRFSConnector';

const SERVER_PORT: string = process.env.PORT || '8080';
const SERVER_URL: string = `http://localhost:${SERVER_PORT}`;

const server: Server = createServer();

server
  .on('request', async (req: IncomingMessage, res: ServerResponse) => {
    if (!req.url) {
      return res.end();
    }

    if (req.url === '/') {
      return missedLocaleHandler(<NormalizedIncomingMessage>req, res);
    }

    if (req.url.indexOf('/translations/') > -1 && req.method === 'GET') {
      return translationsHandler(<NormalizedIncomingMessage>req, res);
    }

    if (req.url.indexOf('/static/') > -1 || req.url === '/favicon.ico') {
      return staticHandler(<NormalizedIncomingMessage>req, res, new RealFileSystemConnector());
    }

    return applicationHandler(<NormalizedIncomingMessage>req, res, cachedRFSConnector);
  })
  .listen(SERVER_PORT, () => console.log(`==> SERVER STARTED on ${SERVER_URL}`));
