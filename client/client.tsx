import { Store } from 'redux';
import * as React from 'react';
import { hydrate } from 'react-dom';
import App from './components/App/App';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { BrowserRouter } from 'react-router-dom';
import I18n, { TranslationContext } from './utils/I18n';

const store: Store = configureStore((window as any).state);
const stateNode: HTMLElement | null = document.getElementById('state');
if (stateNode) {
  document.body.removeChild(stateNode);
}

hydrate(
  <Provider store={store}>
    <BrowserRouter>
        <TranslationContext.Provider
            value={new I18n(store, 'ru', require('../server/src/i18n/ru').default)}
        >
            <App/>
        </TranslationContext.Provider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
