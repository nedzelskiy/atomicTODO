import RenderHtml from '../utils/RenderHTML';
import { IncomingMessage, ServerResponse } from 'http';

export default (req: IncomingMessage, res: ServerResponse): void => {
    if (req.url !== '/') {
        res.statusCode = 404;
        res.end('Not supported url');
        return;
    }

    res.statusCode = 200;
    const render: RenderHtml = new RenderHtml();
    const html: string = render.getStringHTML();
    res.end(html);
}
