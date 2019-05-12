import { Store } from 'redux';
import * as React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import Html from '../../../client/components/Html';
import App from '../../../client/containers/App/App';
import TranslationsConnector
  from '../../../data/translations/TranslationsConnector/TranslationsConnector';
import { ClientTranslationsForLocale }
  from '../../../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import { TranslateHelper } from '../../../data/translations/trnaslations.interfaces';
import ClientTranslator from '../../../data/translations/ClientTranslator/ClientTranslator';
import Environment from '../Environment/Environment';
import { ReactRouteWithMatchedParams } from '../../../client/containers/Router/routes';

export type ReactRender = (element: React.ReactElement) => string | NodeJS.ReadableStream;

export default class ResponseBodyCreator {
  private readonly locale: string;
  private readonly route: ReactRouteWithMatchedParams;
  private readonly context: StaticRouterContext = {};
  private readonly translatorsConnector: TranslationsConnector;

  constructor(
    locale: string,
    route: ReactRouteWithMatchedParams,
    translatorsConnector: TranslationsConnector,
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
    const translationsForLocale: ClientTranslationsForLocale =
      this.translatorsConnector.getClientTranslationsForLocale(this.locale);
    const t: TranslateHelper = new ClientTranslator(translationsForLocale).getTranslator();
    const Component: any = this.route.getComponent();

    return reactRender(
      <Html
        meta={{
          title: t(this.route.meta.title, 'meta'),
        }}
        locale={this.locale}
        state={store.getState()}
        theme={Environment.defaultTheme}
        translationsForLocale={translationsForLocale}
      >
      <Provider store={store}>
        <StaticRouter location={this.route.url} context={this.context}>
          <App
            history={{}}
            locale={this.locale}
            route={{
              id: this.route.id,
              pageName: this.route.pageName,
              params: this.route.routerParams,
            }}
            translations={translationsForLocale}
          >
            <Component {...this.route} />
          </App>
        </StaticRouter>
      </Provider>
      </Html>,
    );
  }

  getContext() {
    return this.context;
  }
}
