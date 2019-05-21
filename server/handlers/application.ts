import { ServerResponse } from 'http';
import { renderToStaticMarkup } from 'react-dom/server';
import { NormalizedIncomingMessage } from '../server';
import { getResponseBodyCreator }
  from '../utils/ResponseBodyCreator/bindings/responseBodyCreatorWithHelpers';
import ResponseBodyCreator from '../utils/ResponseBodyCreator/ResponseBodyCreator';
import dataFetcherWithFile from '../utils/DataFetcher/bindings/dataFetcherWithFile';

export default (req: NormalizedIncomingMessage, res: ServerResponse): void => {
  res.statusCode = 200;

  const responseBodyCreator: ResponseBodyCreator = getResponseBodyCreator(req);

  dataFetcherWithFile.collectFetchJobs();
  const responseBody: string = <string>responseBodyCreator.create(
    renderToStaticMarkup,
    dataFetcherWithFile.getStore(),
  );
  const context = responseBodyCreator.getContext();
  if (!context.url) {
    res.setHeader('Content-Type', 'text/html');
    return res.end(responseBody);
  }

  res.writeHead(302, {
    Location: context.url,
  });
  res.statusCode = 302;
  return res.end();
};
