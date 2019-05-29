import { Store } from 'redux';
import * as React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App/App';
import configureStore from './configureStore';
import routes from './containers/Router/routes';
import Router, { RouterProps } from './containers/Router/Router';
import { ClientTranslationsForLocale }
  from '../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import { getTranslationsStorage, STORAGE_NAME } from './containers/decorators/withTranslator';
import {
  setLocale,
  getLocale,
  setCurrentRoute,
} from './containers/App/app.redux.actions';
import { ApplicationRoute } from './containers/Router/interfaces';
import ResponseBodyCreator from '../server/utils/ResponseBodyCreator/ResponseBodyCreator';

const locale: string = document.documentElement.lang;
const clientTranslationsForLocale: ClientTranslationsForLocale = (window as any)[locale];
const manifest = (window as any).manifest;
const translationsStorage = getTranslationsStorage();
translationsStorage.setTranslations(locale, clientTranslationsForLocale);
const store: Store = configureStore((window as any).state, {
  manifest,
  [STORAGE_NAME]: translationsStorage,
});

const strict = true;

hydrate(
  strict ?
  <React.StrictMode>
    {render()}
  </React.StrictMode>
  : render(),
  document.getElementById('root'),
);

function render() {
  return (
    <Provider store={store}>
      <Router
        routes={routes}
        render={(routerProps: RouterProps, route: ApplicationRoute, id: string) => {
          const Component: any = route.getComponent();
          const { locale } = routerProps.match.params;
          const currentRoute = ResponseBodyCreator.getCurrentRoute({
            id,
            ...route,
            routerParams: routerProps.match.params,
            url: routerProps.history.location.pathname,
          });
          store.dispatch(setCurrentRoute(currentRoute));
          if (translationsStorage.isExistTranslations(locale)) {
            store.dispatch(setLocale(locale));
          } else {
            store.dispatch(getLocale(locale));
          }
          return (
            <App>
              <Component
                pageName={route.pageName}
                templateProps={route.templateProps}
              />
            </App>
          );
        }}
      />
    </Provider>
  );
}
