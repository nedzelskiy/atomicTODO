import { Store } from 'redux';
import * as React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, RouteComponentProps, Switch } from 'react-router-dom';
import App from './containers/App/App';
import configureStore from './configureStore';
import appRoutes from './containers/App/app.routes';
import  BrowserTranslator, { BrowserTranslationsForLocale }
  from '../data/translations/BrowserTranslator/BrowserTranslator';

const locale: string = document.documentElement.lang;
const translationsForLocale: BrowserTranslationsForLocale = (window as any)[locale];
const translator = new BrowserTranslator();
translator.setTranslations(locale, translationsForLocale);
const store: Store = configureStore((window as any).state, { translator });

(window as any).translator = translator;

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Switch key="switch">
        {appRoutes.map((route) => {
          return <Route
            {...route}
            key={route.pageName}
            render={(props: RouteComponentProps) => {
              return (
                <App
                  translator={translator}
                  component={route.getComponent()}
                  routerParams={props.match.params}
                />
              );
            }}
          />;
        })}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
