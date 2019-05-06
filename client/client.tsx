import { Store } from 'redux';
import * as React from 'react';
import { hydrate } from 'react-dom';
import App from './containers/App/App';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { BrowserRouter } from 'react-router-dom';
import  BrowsersTranslator, { BrowserTranslationsForLocale }
  from '../data/translations/BrowsersTranslator/BrowsersTranslator';

const locale: string = document.documentElement.lang;
const translationsForLocale: BrowserTranslationsForLocale = (window as any)[locale];
const translator = new BrowsersTranslator(locale, translationsForLocale);
const store: Store = configureStore({}, { translator });

(window as any).translator = translator;

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App translator={translator} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
