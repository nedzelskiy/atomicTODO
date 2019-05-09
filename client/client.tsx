import { Store } from 'redux';
import * as React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App/App';
import configureStore from './configureStore';
import Router, { RouterProps } from './containers/Router/Router';
import appRoutes, { ReactRoute } from './containers/App/app.routes';
import  ClientTranslationsDto, { ClientTranslationsForLocale }
  from '../data/translations/ClientTranslationsDto/ClientTranslationsDto';

const locale: string = document.documentElement.lang;
const clientTranslationsForLocale: ClientTranslationsForLocale = (window as any)[locale];
const translationsStore = new ClientTranslationsDto();
translationsStore.setTranslations(locale, clientTranslationsForLocale);
const store: Store = configureStore((window as any).state, { translationsStore });

hydrate(
  <Provider store={store}>
    <Router
      routes={appRoutes}
      render={(routerProps: RouterProps, route: ReactRoute) => {
        const Component: any = route.getComponent();
        const translations: ClientTranslationsForLocale =
          translationsStore.getTranslations(routerProps.match.params.locale);
        return (
          <App
            translations={translations}
            routerParams={routerProps.match.params}
          >
            <Component />
          </App>
        );
      }}
    />
  </Provider>,
  document.getElementById('root'),
);
