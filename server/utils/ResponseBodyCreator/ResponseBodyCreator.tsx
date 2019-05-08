import { Store } from 'redux';
import * as React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import Html from '../../../client/components/Html';
import App from '../../../client/containers/App/App';
import TranslatorsConnector
  from '../../../data/translations/TranslatorsConnector/TranslatorsConnector';
import BrowserTranslator, { BrowserTranslationsForLocale }
  from '../../../data/translations/BrowserTranslator/BrowserTranslator';
import { TranslateHelper } from '../../../client/containers/hocs/withTranslations';
import { ReactRouteWithMatchedParams } from '../../../client/containers/App/app.routes';

export type ReactRender = (element: React.ReactElement) => string | NodeJS.ReadableStream;

export default class ResponseBodyCreator {
  private readonly locale: string;
  private readonly route: ReactRouteWithMatchedParams;
  private readonly context: StaticRouterContext = {};
  private readonly translatorsConnector: TranslatorsConnector;

  constructor(
    locale: string,
    route: ReactRouteWithMatchedParams,
    translatorsConnector: TranslatorsConnector,
  ) {
    this.route = route;
    this.locale = locale;
    this.translatorsConnector = translatorsConnector;
    this.getContext = this.getContext.bind(this);
  }

  create(
    reactRender: ReactRender,
    store: Store,
  ): string | NodeJS.ReadableStream {
    const translationsForLocale: BrowserTranslationsForLocale | null =
      this.translatorsConnector.getBrowserTranslationsForLocale(this.locale);
    const browserTranslator: BrowserTranslator = this.translatorsConnector.getBrowserTranslator();
    if (translationsForLocale) {
      browserTranslator.setTranslations(this.locale, translationsForLocale);
    }
    const t: TranslateHelper = this.translatorsConnector.getBrowserTranslateHelper(this.locale);

    return reactRender(
      <Html
        meta={{
          title: t('This is an atomic TODO app'),
        }}
        locale={this.locale}
        state={store.getState()}
        translationsForLocale={translationsForLocale}
      >
        <Provider store={store}>
          <StaticRouter location={this.route.url} context={this.context}>
            <App
              routerParams={this.route.match.params}
              component={this.route.getComponent()}
              translator={browserTranslator}
            />
          </StaticRouter>
        </Provider>
      </Html>,
    );
  }

  getContext() {
    return this.context;
  }
}
