import * as React from 'react';

export interface Props {
  meta: {
    title: string,
  };
  language: string;
  children: React.ReactNode;
}

export default (props: Props): JSX.Element => (
  <html lang={props.language}>
  <head>
    <meta charSet="utf-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="stylesheet" type="text/css" href="/static/client.white.css"/>
    <title>{props.meta.title}</title>
  </head>
  <body>
  <div id="root">{props.children}</div>
  <script id="js-app" type="text/javascript" src="/static/client.js"/>
  </body>
  </html>
);
