import { ServerResponse } from 'http';
import Environment from '../utils/Environment';
import { NormalizedIncomingMessage } from '../../../common/interfaces';

export default (req: NormalizedIncomingMessage, res: ServerResponse): void => {
  res.writeHead(302, {
    Location: Environment.defaultLanguage,
  });
  return res.end();
};
