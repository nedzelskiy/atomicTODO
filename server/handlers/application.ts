import { ServerResponse } from 'http';
import { renderToStaticMarkup } from 'react-dom/server';
import loggerFacade from '../utils/Logger/LoggerFacade';
import configureStore from '../../client/configureStore';
import { NormalizedIncomingMessage } from '../interfaces';
import routes from '../../client/containers/Router/routes';
import DataFetcher from '../utils/DataFetcher/DataFetcher';
import { ErrorCheckedPromiseResult } from '../utils/helpers';
import { FileSystemConnector } from '../utils/connectors/interfaces';
import ServerEnvironment from '../utils/ServerEnvironment/ServerEnvironment';
import ResponseBodyCreator from '../utils/ResponseBodyCreator/ResponseBodyCreator';
import translationsConnector
  from '../../data/translations/TranslationsConnector/bindings/withFSConnector';

export default async (
  req: NormalizedIncomingMessage,
  res: ServerResponse,
  fsc: FileSystemConnector,
) => {

  const env = new ServerEnvironment(req, routes);
  const store = configureStore({}, {});
  const matchedRoute = env.getMatchedRouteWithParams();

  const inDataNeeded = fsc.readJSON('./build/client/inDataNeeded');
  const pageComponent = Object.keys(inDataNeeded).find(
    componentPageName => componentPageName.toLowerCase() === matchedRoute.pageName,
  );

  if (pageComponent) {
    const dataFetcher = new DataFetcher(inDataNeeded[pageComponent]);
    const errorCheckedPromiseResults: ErrorCheckedPromiseResult[] = await dataFetcher.fetch();
    errorCheckedPromiseResults.forEach((promiseResult: ErrorCheckedPromiseResult) => {
      if (promiseResult.isError) {
        loggerFacade.log(promiseResult.error);
        return;
      }
      store.dispatch(promiseResult.result);
    });
  }

  const responseBodyCreator = new ResponseBodyCreator(env, translationsConnector);
  const responseBody: string = <string>responseBodyCreator.create(
    store,
    fsc.readJSON('./build/client/manifest'),
    renderToStaticMarkup,
  );

  const context = responseBodyCreator.getContext();
  if (!context.url) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    return res.end(responseBody);
  }

  res.writeHead(302, {
    Location: context.url,
  });
  res.statusCode = 302;
  return res.end();
};
