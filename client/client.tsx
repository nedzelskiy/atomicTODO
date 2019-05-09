import { Store } from 'redux';
import * as React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App/App';
import configureStore from './configureStore';
import Router, { RouterProps } from './containers/Router/Router';
import appRoutes, { ReactRoute } from './containers/App/app.routes';
import ClientTranslationsDto, { ClientTranslationsForLocale }
  from '../data/translations/ClientTranslationsDto/ClientTranslationsDto';

const locale: string = document.documentElement.lang;
const clientTranslationsForLocale: ClientTranslationsForLocale = (window as any)[locale];
const translationsStorage = new ClientTranslationsDto();
translationsStorage.setTranslations(locale, clientTranslationsForLocale);
const store: Store = configureStore((window as any).state, { translationsStorage });

hydrate(
  <Provider store={store}>
    <Router
      routes={appRoutes}
      render={(routerProps: RouterProps, route: ReactRoute) => {
        const Component: any = route.getComponent();
        const translations: ClientTranslationsForLocale =
          translationsStorage.getTranslations(routerProps.match.params.locale);

        return (
          <App
            translations={translations}
            locale={routerProps.match.params.locale}
            history={routerProps.history}
            route={{
              pageName: route.pageName,
              params: routerProps.match.params,
            }}
          >
            <Component/>
          </App>
        );
      }}
    />
  </Provider>,
  document.getElementById('root'),
);
