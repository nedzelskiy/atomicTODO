import { ServerResponse } from 'http';
import { parse } from 'url';
import { contentType } from 'mime-types';
import { NormalizedIncomingMessage } from '../interfaces';
import ServerEnvironment from '../utils/ServerEnvironment/ServerEnvironment';
import { FileSystemConnector } from '../utils/connectors/interfaces';

export default (
  req: NormalizedIncomingMessage,
  res: ServerResponse,
  fsc: FileSystemConnector,
): void => {
  try {
    const resourceName: string | undefined = req.url.split('/').pop();
    if (!resourceName) {
      throw new Error;
    }
    const pathname: string = <string>parse(resourceName).pathname;
    const ext = pathname.split('.').pop() || '';
    const file = fsc.readFile(`build/client/${pathname}`);
    const ct: string | false = contentType(ext);
    if (ct) {
      res.setHeader('Content-Type', ct);
    }
    if (ext !== 'json') {
      res.setHeader('Cache-Control', `max-age=${ServerEnvironment.maxAgeForStatics}`);
    }
    res.statusCode = 200;
    return res.end(file);
  } catch (e) {
    res.statusCode = 404;
    return res.end('not found!');
  }
};
