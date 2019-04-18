import { Store } from 'redux';
import * as React from 'react';
import { IncomingMessage } from 'http';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import Html from '../../../client/components/Html';
import App from '../../../client/components/App/App';
import configureStore from '../../../client/configureStore';
import I18n, { TranslationContext } from '../../../client/utils/I18n';

export default class RenderHtml {
  private readonly store: Store;
  private readonly req: IncomingMessage;
  private context: {};

  constructor(req: IncomingMessage) {
    this.req = req;
    this.store = configureStore();
  }

  getContext() {
    return this.context;
  }

  getStringHTML(): string {
    return renderToStaticMarkup(
      <Html props={{
        meta: {
          title: 'This is a TODO app',
        },
      }}>
        <Provider store={this.store}>
          <StaticRouter location={this.req.url} context={this.context}>
              <TranslationContext.Provider
                  value={new I18n(this.store, 'ru', require('../i18n/ru').default)}
              >
                <App />
              </TranslationContext.Provider>
          </StaticRouter>
        </Provider>
      </Html>,
    );
  }
}
