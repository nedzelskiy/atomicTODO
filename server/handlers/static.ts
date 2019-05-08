import { ServerResponse } from 'http';
import { contentType } from 'mime-types';
import { NormalizedIncomingMessage } from '../server';
import { FileSystemConnector } from '../utils/FileSystemConnectorFabric/FileSystemConnectorFabric';

export default (
  req: NormalizedIncomingMessage,
  res: ServerResponse,
  fsc: FileSystemConnector,
): void => {
  try {
    const resourceName: string | undefined = req.url.split('/').pop();
    const file = fsc.readFile(`build/client/${resourceName}`);
    if (resourceName) {
      const ct: string | false = contentType(<string>resourceName.split('.').pop());
      if (ct) {
        res.setHeader('Content-Type', ct);
      }
    }
    res.setHeader('Cache-Control', `max-age=${60 * 60 * 24 * 31}`);
    res.statusCode = 200;
    return res.end(file);
  } catch (e) {
    res.statusCode = 404;
    return res.end('not found!');
  }
};
