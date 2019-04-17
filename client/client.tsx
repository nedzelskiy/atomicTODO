import { Store } from 'redux';
import * as React from 'react';
import { hydrate } from 'react-dom';
import App from './components/App/App';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { BrowserRouter } from 'react-router-dom';

const store: Store = configureStore((window as any).state);
const stateNode: HTMLElement | null = document.getElementById('state');
if (stateNode) {
  document.body.removeChild(stateNode);
}

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
