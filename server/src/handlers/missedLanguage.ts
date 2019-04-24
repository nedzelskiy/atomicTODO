import { ServerResponse } from 'http';
import { NormalizedIncomingMessage } from '../../../common/interfaces';

export default (req: NormalizedIncomingMessage, res: ServerResponse): void => {
  res.writeHead(302, {
    Location: '/ru',
  });
  return res.end();
};
