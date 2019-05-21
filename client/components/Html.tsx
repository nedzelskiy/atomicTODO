import * as React from 'react';
import * as serialize from 'serialize-javascript';
import { StateOfReducers } from '../../data/redux.reducers';
import { ClientTranslationsForLocale }
  from '../../data/translations/ClientTranslationsDto/ClientTranslationsDto';

export interface Props {
  meta: {
    title: string,
  };
  theme: string;
  locale: string;
  state: StateOfReducers;
  children: React.ReactNode;
  translationsForLocale: ClientTranslationsForLocale | null;
}

export default (props: Props): JSX.Element => (
  <html lang={props.locale}>
  <head>
    <meta charSet="utf-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="stylesheet" type="text/css" href={`/static/client.${props.theme}.css`} />
    <title id="title">{props.meta.title}</title>
  </head>
    <body>
      {props.translationsForLocale && <script
        id="translations-for-locale"
        dangerouslySetInnerHTML=
          {{ __html: `window['${props.locale}']=${serialize(props.translationsForLocale)};` }}
      />}
      <script
        id="state"
        dangerouslySetInnerHTML={{ __html: `window.state=${serialize(props.state)};` }}
      />
      <div id="root">{props.children}</div>
      <script id="js-app" type="text/javascript" src="/static/client.js"/>
    </body>
  </html>
);