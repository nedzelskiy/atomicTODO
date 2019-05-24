import { ServerResponse } from 'http';
import { renderToStaticMarkup } from 'react-dom/server';
import ResponseBodyCreator from '../utils/ResponseBodyCreator/ResponseBodyCreator';

export default (res: ServerResponse, responseBodyCreator: ResponseBodyCreator): void => {
  res.statusCode = 200;

  const responseBody: string = <string>responseBodyCreator.create(renderToStaticMarkup);
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
