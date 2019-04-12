import { readFileSync } from 'fs';
import { contentType } from 'mime-types';
import { IncomingMessage, ServerResponse } from 'http';

export default (req: IncomingMessage, res: ServerResponse): void => {
    if (!req.url) {
        return res.end();
    }
    try {
        const resourceName: string | undefined = req.url.split('/').pop();
        const file = readFileSync(`build/client/${resourceName}`);
        if (resourceName) {
            const ct = contentType(<string>resourceName.split('.').pop());
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
}
