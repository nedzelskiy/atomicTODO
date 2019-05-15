import { Store } from 'redux';
import * as React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App/App';
import configureStore from './configureStore';
import Router, { RouterProps } from './containers/Router/Router';
import { ClientTranslationsForLocale }
  from '../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import routes, { ApplicationRoute } from './containers/Router/routes';
import { getTranslationsStorage } from './containers/hocs/withTranslator';

const locale: string = document.documentElement.lang;
const clientTranslationsForLocale: ClientTranslationsForLocale = (window as any)[locale];
const translationsStorage = getTranslationsStorage();
translationsStorage.setTranslations(locale, clientTranslationsForLocale);
const store: Store = configureStore((window as any).state, { translationsStorage });

hydrate(
    <Provider store={store}>
      <Router
        routes={routes}
        render={(routerProps: RouterProps, route: ApplicationRoute, id: string) => {
          console.log('==========> router changed')
          const Component: any = route.getComponent();

          return (
            <App
              translationsStorage={translationsStorage}
              locale={routerProps.match.params.locale}
              route={{
                id,
                pageName: route.pageName,
                params: routerProps.match.params,
                url: routerProps.history.location.pathname,
              }}
            >
              <Component
                {...route}
                url={routerProps.location.pathname}
                routerParams={routerProps.match.params}
              />
            </App>
          );
        }}
      />
    </Provider>,
  document.getElementById('root'),
);

// <React.StrictMode>
