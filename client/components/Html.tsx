import * as React from 'react';

export interface Props {
    meta: {
        title: string,
    },
    children?: any,//React.ReactNode,
    state: {
        App: any,
    },
}

export default (props: any): JSX.Element => (
    <html>
        <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {/*<title>{ props.meta.title }</title>*/}
        </head>
        <body>
            <div id="root">{ props.children }</div>
            <script id="js-app" type="text/javascript" src="/static/client.js" />
        </body>
    </html>
);
