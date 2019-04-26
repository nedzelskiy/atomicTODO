import { Store } from 'redux';
import * as React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import Environment from './Environment';
import I18n, { I18nTranslator } from '../../../common/helpers/I18n';
import Html from '../../../client/components/Html';
import App from '../../../client/components/App/App';
import { TranslationsHelper } from './TranslationsHelper';
import { NormalizedIncomingMessage, TranslationsForLocale } from '../../../common/interfaces';

export default class RenderHtml {
  private readonly store: Store;
  private readonly req: NormalizedIncomingMessage;
  private readonly translationsHelper: TranslationsHelper;
  private context: {};

  constructor(
    req: NormalizedIncomingMessage,
    store: Store,
    translationsHelper: TranslationsHelper,
  ) {
    this.req = req;
    this.store = store;
    this.translationsHelper = translationsHelper;
  }

  getLocale(): string {
    return Environment.getCheckedLanguage(this.req.url.split('/')[1]);
  }

  getContext() {
    return this.context;
  }

  getStringHTML(): string {
    const locale: string = this.getLocale();
    const translationsForLocale: TranslationsForLocale =
      this.translationsHelper.getTranslationsForLocale(locale);
    const t: I18nTranslator = this.translationsHelper.getTranslator();
    return renderToStaticMarkup(
      <Html
        translationsForLocale={translationsForLocale}
        state={this.store.getState()}
        language={locale}
        meta={{
          title: t(locale, 'This is an atomic TODO app'),
        }}
      >
      <Provider store={this.store}>
        <StaticRouter location={this.req.url} context={this.context}>
          <I18n.context.Provider
            value={new I18n(locale, translationsForLocale)}
          >
            <App/>
          </I18n.context.Provider>
        </StaticRouter>
      </Provider>
      </Html>,
    );
  }
}
