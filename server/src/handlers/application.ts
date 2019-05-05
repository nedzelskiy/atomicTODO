import { ServerResponse } from 'http';
import { NormalizedIncomingMessage } from '../server';
import { createReactResponse } from '../utils/ResponseBody/bindings/reactResponse';

export default (req: NormalizedIncomingMessage, res: ServerResponse): void => {
  res.statusCode = 200;

  if (req.url.indexOf('/get-translations/') > -1 && req.method === 'GET') {

  }

  const reactResponse = createReactResponse(req);
  const responseString: string = reactResponse.render();
  return res.end(responseString);
};
