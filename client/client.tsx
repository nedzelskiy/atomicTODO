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
import {
  setLocale,
  changeLocale,
  startLoading,
  setCurrentRoute,
} from './containers/App/app.redux.actions';
import { ApplicationRoute } from './containers/Router/interfaces';
import ResponseBodyCreator from '../server/utils/ResponseBodyCreator/ResponseBodyCreator';

const locale: string = document.documentElement.lang;
const clientTranslationsForLocale: ClientTranslationsForLocale = (window as any)[locale];
const translationsStorage = getTranslationsStorage();
translationsStorage.setTranslations(locale, clientTranslationsForLocale);
const store: Store = configureStore((window as any).state, { [STORAGE_NAME]: translationsStorage });

hydrate(
  <React.StrictMode>
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
            store.dispatch(startLoading());
            store.dispatch(changeLocale(locale));
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
  </React.StrictMode>,
  document.getElementById('root'),
);
