import { ServerResponse } from 'http';
import { NormalizedIncomingMessage } from '../interfaces';
import Environment from '../utils/Environment/Environment';

export default (req: NormalizedIncomingMessage, res: ServerResponse): void => {
  res.writeHead(302, {
    Location: `/${Environment.defaultLocale}`,
  });
  return res.end();
};
