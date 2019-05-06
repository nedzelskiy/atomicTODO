import * as React from 'react';
import * as serialize from 'serialize-javascript';
import { StateOfReducers } from '../../data/redux.reducers';
import { BrowserTranslationsForLocale }
  from '../../data/translations/BrowsersTranslator/BrowsersTranslator';

export interface Props {
  meta: {
    title: string,
  };
  locale: string;
  state: StateOfReducers;
  children: React.ReactNode;
  translationsForLocale: BrowserTranslationsForLocale;
}

export default (props: Props): JSX.Element => (
  <html lang={props.locale}>
  <head>
    <meta charSet="utf-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="stylesheet" type="text/css" href="/static/client.white.css"/>
    <title>{props.meta.title}</title>
  </head>
    <body>
      <script
        id="translations-for-locale"
        dangerouslySetInnerHTML=
          {{ __html: `window['${props.locale}']=${serialize(props.translationsForLocale)};` }}
      />
      <div id="root">{props.children}</div>
      <script id="js-app" type="text/javascript" src="/static/client.js"/>
    </body>
  </html>
);
