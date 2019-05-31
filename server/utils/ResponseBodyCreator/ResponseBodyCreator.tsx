import { Store } from 'redux';
import * as React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import Html from '../../../client/components/Html';
import ServerEnvironment from '../ServerEnvironment/ServerEnvironment';
import App from '../../../client/containers/App/App';
import TranslationsConnector
  from '../../../data/translations/TranslationsConnector/TranslationsConnector';
import { ClientTranslationsForLocale }
  from '../../../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import { TranslateHelper } from '../../../data/translations/trnaslations.interfaces';
import { CurrentRoute } from '../../../client/containers/App/app.redux.initial-state';
import { ReactRouteWithMatchedParams } from '../../../client/containers/Router/interfaces';
import ClientTranslator from '../../../data/translations/ClientTranslator/ClientTranslator';
import { setTranslationsStorage } from '../../../client/containers/decorators/withTranslator';
import { setCurrentRoute, setLocale } from '../../../client/containers/App/app.redux.actions';

export type ReactRender = (element: React.ReactElement) => string | NodeJS.ReadableStream;

export default class ResponseBodyCreator {
  private readonly env: ServerEnvironment;
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

  private fillStore(store: Store) {
    store.dispatch(setLocale(this.env.getLocale()));
    store.dispatch(setCurrentRoute(
      ResponseBodyCreator.getCurrentRoute(this.env.getMatchedRouteWithParams(),
    )));
  }

  constructor(
    env: ServerEnvironment,
    translatorsConnector: TranslationsConnector,
  ) {
    this.env = env;
    this.translatorsConnector = translatorsConnector;
    this.getContext = this.getContext.bind(this);
  }

  create(
    store: Store,
    manifest: object,
    reactRender: ReactRender,
  ): string | NodeJS.ReadableStream {
    const translationsForLocale: ClientTranslationsForLocale =
      this.translatorsConnector.getClientTranslationsForLocale(this.env.getLocale());
    const t: TranslateHelper = new ClientTranslator(translationsForLocale).getTranslator();
    const matchedRoute: ReactRouteWithMatchedParams = this.env.getMatchedRouteWithParams();
    const Component: any = matchedRoute.getComponent();
    setTranslationsStorage(this.translatorsConnector.getClientTranslationsDto());
    this.fillStore(store);

    return reactRender(
      <Html
        meta={{
          title: t(matchedRoute.meta.title, 'meta'),
        }}
        manifest={manifest}
        locale={this.env.getLocale()}
        state={store.getState()}
        theme={this.env.getDefaultTheme()}
        translationsForLocale={translationsForLocale}
      >
      <Provider store={store}>
        <StaticRouter location={matchedRoute.url} context={this.context}>
          <App>
            <Component
              {...matchedRoute.componentProps}
              pageName={matchedRoute.pageName}
              templateProps={matchedRoute.templateProps}
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
