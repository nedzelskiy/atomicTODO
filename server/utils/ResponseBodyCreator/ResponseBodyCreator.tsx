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
import { CurrentRoute } from '../../../client/containers/App/app.redux.initial-state';
import { setTranslationsStorage } from '../../../client/containers/decorators/withTranslator';
import { ReactRouteWithMatchedParams } from '../../../client/containers/Router/interfaces';

export type ReactRender = (element: React.ReactElement) => string | NodeJS.ReadableStream;

export default class ResponseBodyCreator {
  private readonly store: Store;
  private readonly env: Environment;
  private readonly context: StaticRouterContext = {};
  private readonly translatorsConnector: TranslationsConnector;

  static getCurrentRoute(route: ReactRouteWithMatchedParams): CurrentRoute {
    return {
      id: route.id,
      url: route.url,
      pageName: route.pageName,
      params: route.routerParams,
    };
  }

  constructor(
    env: Environment,
    store: Store,
    translatorsConnector: TranslationsConnector,
  ) {
    this.env = env;
    this.store = store;
    this.translatorsConnector = translatorsConnector;
    this.getContext = this.getContext.bind(this);
  }

  create(
    reactRender: ReactRender,
  ): string | NodeJS.ReadableStream {
    const route: ReactRouteWithMatchedParams = this.env.getMatchedRouteWithParams();
    const locale = this.env.getLocale();
    const translationsForLocale: ClientTranslationsForLocale =
      this.translatorsConnector.getClientTranslationsForLocale(locale);
    const t: TranslateHelper = new ClientTranslator(translationsForLocale).getTranslator();
    const Component: any = route.getComponent();
    setTranslationsStorage(this.translatorsConnector.getClientTranslationsDto());

    return reactRender(
      <Html
        meta={{
          title: t(route.meta.title, 'meta'),
        }}
        locale={locale}
        state={this.store.getState()}
        theme={Environment.defaultTheme}
        translationsForLocale={translationsForLocale}
      >
        <Provider store={this.store}>
          <StaticRouter location={route.url} context={this.context}>
            <App
              locale={locale}
              route={ResponseBodyCreator.getCurrentRoute(route)}
              translationsStorage={this.translatorsConnector.getClientTranslationsDto()}
            >
              <Component {...route} />
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
