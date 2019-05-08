import { ServerResponse } from 'http';
import Environment from '../utils/Environment/Environment';
import { NormalizedIncomingMessage } from '../server';

export default (req: NormalizedIncomingMessage, res: ServerResponse): void => {
  res.writeHead(302, {
    Location: Environment.defaultLocale,
  });
  return res.end();
};
