import * as React from 'react';
import App from '../../../client/components/App/App';
import { renderToStaticMarkup } from 'react-dom/server';
import Html from '../../../client/components/Html';

export default class RenderHtml {
  getStringHTML(): string {
    return renderToStaticMarkup(
      <Html props={{
        meta: {
          title: 'This is a TODO app',
        },
      }}>
        <App/>
      </Html>,
    );
  }
}
