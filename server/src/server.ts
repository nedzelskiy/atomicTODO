import staticHandler from './handlers/static';
import applicationHandler from './handlers/application';
import translationsHandler from './handlers/translations';
import missedLanguageHandler from './handlers/missedLanguage';
import { Server, createServer, ServerResponse, IncomingMessage } from 'http';
import RealFileSystemConnector
  from './utils/FileSystemConnectorFabric/bindings/RealFileSystemConnector';

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

    if (req.url.indexOf('/translations/') > -1 && req.method === 'GET') {
      return translationsHandler(<NormalizedIncomingMessage>req, res);
    }

    if (req.url.indexOf('/static/') > -1 || req.url === '/favicon.ico') {
      return staticHandler(<NormalizedIncomingMessage>req, res, new RealFileSystemConnector());
    }

    return applicationHandler(<NormalizedIncomingMessage>req, res);
  })
  .listen(SERVER_PORT, () => console.log(`==> SERVER STARTED on ${SERVER_URL}`));

export interface NormalizedIncomingMessage extends IncomingMessage {
  url: string;
}
