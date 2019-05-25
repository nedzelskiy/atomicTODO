import { Store } from 'redux';
import * as React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import Html from '../../../client/components/Html';
import Environment from '../Environment/Environment';
import App from '../../../client/containers/App/App';
import TranslationsConnector
  from '../../../data/translations/TranslationsConnector/TranslationsConnector';
import { ClientTranslationsForLocale }
  from '../../../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import { TranslateHelper } from '../../../data/translations/trnaslations.interfaces';
import ClientTranslator from '../../../data/translations/ClientTranslator/ClientTranslator';
import { CurrentRoute } from '../../../client/containers/App/app.redux.initial-state';
import { setTranslationsStorage } from '../../../client/containers/decorators/withTranslator';
import { ReactRouteWithMatchedParams } from '../../../client/containers/Router/interfaces';
import { setCurrentRoute, setLocale } from '../../../client/containers/App/app.redux.actions';

export type ReactRender = (element: React.ReactElement) => string | NodeJS.ReadableStream;

export default class ResponseBodyCreator {
  private readonly locale: string;
  private readonly context: StaticRouterContext = {};
  private readonly matchedRoute: ReactRouteWithMatchedParams;
  private readonly translatorsConnector: TranslationsConnector;

  static getCurrentRoute(route: ReactRouteWithMatchedParams): CurrentRoute {
    return {
      id: route.id,
      url: route.url,
      pageName: route.pageName,
      params: route.routerParams,
    };
  }

  private fillStore(store: Store) {
    store.dispatch(setLocale(this.locale));
    store.dispatch(setCurrentRoute(ResponseBodyCreator.getCurrentRoute(this.matchedRoute)));
  }

  constructor(
    locale: string,
    matchedRoute: ReactRouteWithMatchedParams,
    translatorsConnector: TranslationsConnector,
  ) {
    this.locale = locale;
    this.matchedRoute = matchedRoute;
    this.translatorsConnector = translatorsConnector;
    this.getContext = this.getContext.bind(this);
  }

  create(
    store: Store,
    reactRender: ReactRender,
  ): string | NodeJS.ReadableStream {
    const translationsForLocale: ClientTranslationsForLocale =
      this.translatorsConnector.getClientTranslationsForLocale(this.locale);
    const t: TranslateHelper = new ClientTranslator(translationsForLocale).getTranslator();
    const Component: any = this.matchedRoute.getComponent();
    setTranslationsStorage(this.translatorsConnector.getClientTranslationsDto());
    this.fillStore(store);

    return reactRender(
      <Html
        meta={{
          title: t(this.matchedRoute.meta.title, 'meta'),
        }}
        locale={this.locale}
        state={store.getState()}
        theme={Environment.defaultTheme}
        translationsForLocale={translationsForLocale}
      >
      <Provider store={store}>
        <StaticRouter location={this.matchedRoute.url} context={this.context}>
          <App>
            <Component
              pageName={this.matchedRoute.pageName}
              templateProps={this.matchedRoute.templateProps}
            />
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
