import * as React from 'react';
import * as serialize from 'serialize-javascript';
import { TranslationsForLocale } from '../../common/interfaces';

export interface Props {
  meta: {
    title: string,
  };
  language: string;
  children: React.ReactNode;
  state: any;
  translationsForLocale: TranslationsForLocale;
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
      <script
        id="state"
        dangerouslySetInnerHTML={{ __html: `window.state=${serialize(props.state)};` }}
      />
      <script
        id="translations-for-locale"
        dangerouslySetInnerHTML=
          {{ __html: `window['${props.language}']=${serialize(props.translationsForLocale)};` }}
      />
      <div id="root">{props.children}</div>
      <script id="js-app" type="text/javascript" src="/static/client.js"/>
    </body>
  </html>
);
