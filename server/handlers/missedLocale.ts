import { ServerResponse } from 'http';
import { NormalizedIncomingMessage } from '../interfaces';
import ServerEnvironment from '../utils/ServerEnvironment/ServerEnvironment';

export default (req: NormalizedIncomingMessage, res: ServerResponse): void => {
  const env = new ServerEnvironment(req, {});
  res.writeHead(302, {
    Location: `/${env.getLocale()}`,
  });
  return res.end();
};
