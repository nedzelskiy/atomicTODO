import staticHandler from './handlers/static';
import applicationHandler from './handlers/application';
import { Server, createServer, ServerResponse, IncomingMessage } from 'http';

const SERVER_PORT: number = 8080;
const SERVER_URL: string = `http://localhost:${SERVER_PORT}`;

const server: Server = createServer();

server
    .on('request', (req: IncomingMessage, res: ServerResponse) => {
        if (!req.url) {
            return res.end();
        }
        return req.url.indexOf('static/') > -1
            ? staticHandler(req, res)
            : applicationHandler(req, res);
    })
    .listen(SERVER_PORT, () => console.log(`==> SERVER STARTED on ${SERVER_URL}`));
