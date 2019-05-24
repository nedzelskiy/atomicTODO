import staticHandler from './handlers/static';
import applicationHandler from './handlers/application';
import routes from '../client/containers/Router/routes';
import translationsHandler from './handlers/translations';
import missedLocaleHandler from './handlers/missedLocale';
import { Server, createServer, ServerResponse, IncomingMessage } from 'http';
import RealFileSystemConnector
  from './utils/connectors/RealFileSystemConnector';
import Environment from './utils/Environment/Environment';
import ResponseBodyCreator from './utils/ResponseBodyCreator/ResponseBodyCreator';
import withFilesFromRealFs
  from '../data/translations/TranslationsConnector/bindings/withFilesFromRealFs';
import DataFetcher from './utils/DataFetcher/DataFetcher';
import configureStore from '../client/configureStore';
import loggerFacade from './utils/Logger/LoggerFacade';

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

    const env = new Environment(<NormalizedIncomingMessage>req, routes);
    const store = configureStore({}, {});
    const dataFetcher = new DataFetcher(
      env,
      require('../build/client/inDataNeeded'),
    );
    console.log('1');
    const reduxInstruction = await dataFetcher.getReduxInstructions();
    reduxInstruction.forEach((promise) => {
      if (promise.isError) {
        loggerFacade.log(promise.e);
        return;
      }
      store.dispatch(promise.v);
    });
    console.log('2');

    return applicationHandler(res, new ResponseBodyCreator(env, store, withFilesFromRealFs));
  })
  .listen(SERVER_PORT, () => console.log(`==> SERVER STARTED on ${SERVER_URL}`));

export interface NormalizedIncomingMessage extends IncomingMessage {
  url: string;
}

export interface ResponseData {
  success: boolean;
  data: any;
}
