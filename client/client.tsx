import { Store } from 'redux';
import * as React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App/App';
import configureStore from './configureStore';
import Router, { RouterProps } from './containers/Router/Router';
import ClientTranslationsDto, { ClientTranslationsForLocale }
  from '../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import routes, { ApplicationRoute } from './containers/Router/routes';

const locale: string = document.documentElement.lang;
const clientTranslationsForLocale: ClientTranslationsForLocale = (window as any)[locale];
const translationsStorage = new ClientTranslationsDto();
translationsStorage.setTranslations(locale, clientTranslationsForLocale);
const store: Store = configureStore((window as any).state, { translationsStorage });

hydrate(
  <Provider store={store}>
    <Router
      routes={routes}
      render={(routerProps: RouterProps, route: ApplicationRoute, id: string) => {
        console.log('==========> router changed', routerProps.match.params.locale)
        const Component: any = route.getComponent();
        const translations: ClientTranslationsForLocale =
          translationsStorage.getTranslations(routerProps.match.params.locale);

        return (
          <App
            translations={translations}
            locale={routerProps.match.params.locale}
            history={routerProps.history}
            route={{
              id,
              pageName: route.pageName,
              params: routerProps.match.params,
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
