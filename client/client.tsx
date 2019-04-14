import * as React from 'react';
import { hydrate } from 'react-dom';
import App from './components/App/App';

hydrate(
    <App />,
    document.getElementById('root'),
);

declare let module: { hot: any };
if (module.hot) {
    module.hot.accept('./components/App/App', () => {
        hydrate(
            <App />,
            document.getElementById('app')
        );
    });
}