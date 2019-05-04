import { Store } from 'redux';
import * as React from 'react';
import { hydrate } from 'react-dom';
import App from './containers/App/App';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { BrowserRouter } from 'react-router-dom';
import I18n from '../common/helpers/I18n';
import { TranslationsForLocale } from '../common/interfaces';

const lang: string = document.documentElement.lang;
const translationsForLocale: TranslationsForLocale = (window as any)[lang];
const i18n: I18n = new I18n(lang, translationsForLocale);
const store: Store = configureStore((window as any).state, { i18n });
(window as any).i18n = i18n;

deleteUnnecessaryDomNodes();
delete (window as any)[lang];

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App i18n={i18n} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

function deleteUnnecessaryDomNodes() {
  const translationsNode: HTMLElement | null = document.getElementById('translations-for-locale');
  if (translationsNode) {
    document.body.removeChild(translationsNode);
  }
}
