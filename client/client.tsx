import { Store } from 'redux';
import * as React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App/App';
import configureStore from './configureStore';
import Router, { RouterProps } from './containers/Router/Router';
import { ClientTranslationsForLocale }
  from '../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import routes from './containers/Router/routes';
import { getTranslationsStorage, STORAGE_NAME } from './containers/decorators/withTranslator';
import PageFirewall from './containers/PageFirewall/PageFirewall';
import { setCurrentRoute } from './containers/App/app.redux.actions';
import { CurrentRoute } from './containers/App/app.redux.initial-state';
import { ApplicationRoute } from './containers/Router/interfaces';

const locale: string = document.documentElement.lang;
const clientTranslationsForLocale: ClientTranslationsForLocale = (window as any)[locale];
const translationsStorage = getTranslationsStorage();
translationsStorage.setTranslations(locale, clientTranslationsForLocale);
const store: Store = configureStore((window as any).state, { [STORAGE_NAME]: translationsStorage });

hydrate(
  <Provider store={store}>
    <Router
      routes={routes}
      render={(routerProps: RouterProps, route: ApplicationRoute, id: string) => {
        console.log('==========> router changed');
        const Component: any = route.getComponent();
        const { locale } = routerProps.match.params;
        const currentRoute: CurrentRoute = {
          id,
          pageName: route.pageName,
          params: routerProps.match.params,
          url: routerProps.history.location.pathname,
        };

        store.dispatch(setCurrentRoute(currentRoute));

        return (
          <PageFirewall>
            <App
              translationsStorage={translationsStorage}
              locale={locale}
              route={currentRoute}
            >
              <Component
                {...route}
                url={routerProps.location.pathname}
                routerParams={routerProps.match.params}
              />
            </App>
          </PageFirewall>
        );
      }}
    />
  </Provider>,
  document.getElementById('root'),
);

// <React.StrictMode>
