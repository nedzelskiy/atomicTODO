import { Store } from 'redux';
import * as React from 'react';
import { hydrate } from 'react-dom';
import App from './components/App/App';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { BrowserRouter } from 'react-router-dom';
import I18n from '../common/helpers/I18n';
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
const translationsNode: HTMLElement | null = document.getElementById('translations-for-locale');
if (translationsNode) {
  document.body.removeChild(translationsNode);
}

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <I18n.context.Provider value={(window as any).i18n}>
        <App/>
      </I18n.context.Provider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
