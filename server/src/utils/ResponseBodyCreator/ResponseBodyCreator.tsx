import { Store } from 'redux';
import * as React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import Environment from '../Environment/Environment';
import Html from '../../../../client/components/Html';
import App from '../../../../client/containers/App/App';
import { NormalizedIncomingMessage } from '../../server';
import { ServerTranslationsFormat }
  from '../../../../data/translations/ServerTranslator/ServerTranslator';
import BrowsersTranslator, { BrowserTranslationsForLocale }
  from '../../../../data/translations/BrowsersTranslator/BrowsersTranslator';
import { TranslateHelper } from '../../../../client/containers/hocs/WithTranslations';

export type ReactRender = (element: React.ReactElement) => string | NodeJS.ReadableStream;

export default class ResponseBodyCreator {
  private readonly store: Store;
  private readonly req: NormalizedIncomingMessage;
  private readonly browserTranslator: BrowsersTranslator;
  private readonly serverTranslator: ServerTranslationsFormat;
  private readonly reactRender: ReactRender;
  private readonly context: StaticRouterContext = {};
  private locale: string;
  private translationsForLocale: BrowserTranslationsForLocale;

  constructor(
    store: Store,
    browserTranslator: BrowsersTranslator,
    serverTranslator: ServerTranslationsFormat,
    reactRender: ReactRender,
    req: NormalizedIncomingMessage,
  ) {
    this.req = req;
    this.store = store;
    this.reactRender = reactRender;
    this.serverTranslator = serverTranslator;
    this.browserTranslator = browserTranslator;
    this.setLocale();
    this.setTranslationsForLocale();
    this.getContext = this.getContext.bind(this);
  }

  setLocale(): void {
    this.locale = Environment.getCheckedLocale(this.req.url.split('/')[1]);
  }

  getContext() {
    return this.context;
  }

  getTranslateHelper(): TranslateHelper {
    this.browserTranslator.setTranslations(this.locale, this.translationsForLocale);
    return this.browserTranslator.translate.bind(this.browserTranslator, this.locale);
  }

  setTranslationsForLocale(): void {
    this.translationsForLocale = this.serverTranslator.getBrowserTranslationsForLocale(this.locale);
  }

  create(): string | NodeJS.ReadableStream {
    const t: TranslateHelper = this.getTranslateHelper();

    return this.reactRender(
      <Html
        meta={{
          title: t('This is an atomic TODO app'),
        }}
        locale={this.locale}
        state={this.store.getState()}
        translationsForLocale={this.translationsForLocale}
      >
        <Provider store={this.store}>
          <StaticRouter location={this.req.url} context={this.context}>
            <App translator={this.browserTranslator}/>
          </StaticRouter>
        </Provider>
      </Html>,
    );
  }
}
