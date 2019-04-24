import { Store } from 'redux';
import * as React from 'react';
import { hydrate } from 'react-dom';
import App from './components/App/App';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { BrowserRouter } from 'react-router-dom';
import I18n, { TranslationContext } from './utils/I18n';
import { TranslationsForLocale } from '../common/interfaces';

const store: Store = configureStore((window as any).state);
const stateNode: HTMLElement | null = document.getElementById('state');
if (stateNode) {
  document.body.removeChild(stateNode);
}
const lang: string = document.documentElement.lang;
const translationsForLocale: TranslationsForLocale = (window as any)[lang];
delete (window as any)[lang];
(window as any).i18n = new I18n(lang, translationsForLocale);

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <TranslationContext.Provider value={(window as any).i18n}>
        <App/>
      </TranslationContext.Provider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
