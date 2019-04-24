import { Store } from 'redux';
import * as React from 'react';
import { readFileSync } from 'fs';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import Html from '../../../client/components/Html';
import App from '../../../client/components/App/App';
import configureStore from '../../../client/configureStore';
import I18n, { TranslationContext } from '../../../client/utils/I18n';
import { NormalizedIncomingMessage } from '../../../common/interfaces';

export default class RenderHtml {
  private readonly store: Store;
  private readonly req: NormalizedIncomingMessage;
  private context: {};

  constructor(req: NormalizedIncomingMessage) {
    this.req = req;
    this.store = configureStore();
  }

  getLocale(): string {
    return this.req.url.split('/')[1];
  }

  getContext() {
    return this.context;
  }

  getStringedTranslations(locale: string): string {
    try {
      return readFileSync(`../i18n/${locale}.json`, 'UTF-8');
    } catch (e) {
      return '{}';
    }
  }

  getStringHTML(): string {
    const locale = this.getLocale();
    const translations = this.getStringedTranslations(locale);
    return renderToStaticMarkup(
      <Html
        language={locale}
        meta={{
          title: 'This is a TODO app',
        }}
      >
        <div></div>
        <Provider store={this.store}>
          <StaticRouter location={this.req.url} context={this.context}>
            <TranslationContext.Provider
              value={new I18n('ru', JSON.parse(translations))}
            >
              <App/>
            </TranslationContext.Provider>
          </StaticRouter>
        </Provider>
      </Html>,
    );
  }
}
