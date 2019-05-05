import { Store } from 'redux';
import * as React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import Environment from '../Environment/Environment';
import Html from '../../../../client/components/Html';
import App from '../../../../client/containers/App/App';
import { NormalizedIncomingMessage } from '../../server';
import { ServerTranslationsFormat }
  from '../../../../data/translations/ServerTranslator/ServerTranslator';
import BrowsersTranslator, { BrowserTranslationsForLocale }
  from '../../../../data/translations/BrowsersTranslator/BrowsersTranslator';
import ReactTranslator, { TranslateHelper }
  from '../../../../data/translations/BrowsersTranslator/bindings/ReactTranslator';

export default class ResponseBody {
  private readonly store: Store;
  private readonly req: NormalizedIncomingMessage;
  private readonly browserTranslator: BrowsersTranslator;
  private readonly serverTranslator: ServerTranslationsFormat;
  private context: {};

  constructor(
    store: Store,
    browserTranslator: BrowsersTranslator,
    serverTranslator: ServerTranslationsFormat,
    req: NormalizedIncomingMessage,
  ) {
    this.req = req;
    this.store = store;
    this.serverTranslator = serverTranslator;
    this.browserTranslator = browserTranslator;
  }

  getLocale(): string {
    return Environment.getCheckedLocale(this.req.url.split('/')[1]);
  }

  getContext() {
    return this.context;
  }

  render(): string {
    const locale: string = this.getLocale();
    const translationsForLocale: BrowserTranslationsForLocale =
      this.serverTranslator.getBrowserTranslationsForLocale(locale);
    this.browserTranslator.setTranslations(locale, translationsForLocale);
    const t: TranslateHelper =
      this.browserTranslator.translate.bind(this.browserTranslator, locale);
    return renderToStaticMarkup(
      <Html
        translationsForLocale={translationsForLocale}
        state={this.store.getState()}
        language={locale}
        meta={{
          title: t('This is an atomic TODO app'),
        }}
      >
      <Provider store={this.store}>
        <StaticRouter location={this.req.url} context={this.context}>
          <App translator={new ReactTranslator(this.browserTranslator)} />
        </StaticRouter>
      </Provider>
      </Html>,
    );
  }
}
