import * as React from 'react';
import App from '../../../client/components/App';
import { renderToStaticMarkup } from 'react-dom/server';
import Html from '../../../client/components/Html';

export default class RenderHTML {
    getStringHTML(): string {
        return renderToStaticMarkup(
            <Html props={{
                meta: {
                    title: 'This is a TODO app',
                },
            }}>
                <App />
            </Html>
        );
    }
};
