import * as React from 'react';
import { Route, Switch } from 'react-router';
import Header from '../organismes/Header/Header';
import routes, { ReactRoute } from './routes';
import './app.styles.scss';

class App extends React.Component<any> {
  static renderRouteComponent(route: ReactRoute, props: any) {
    /* tslint:disable:variable-name */
    const Component: React.FunctionComponent<any> = route.getComponent();
    /* tslint:enable:variable-name */
    return [
      <Header key="header"/>,
      <main key="main">
        <Component {...props} />
      </main>,
    ];
  }

  renderRoute(route: ReactRoute) {
    return <Route
      {...route}
      key={route.pageName}
      render={(props) => {
        return App.renderRouteComponent(route, props);
      }}
    />;
  }

  render() {
    return [
      <Switch>
        {routes.map((route) => {
          return this.renderRoute(route);
        })}
        <Route
          path="/"
          key="lang-missed"
          render={() => {
            return <div>found /</div>;
          }}
        />
      </Switch>,
    ];
  }
}

export default App;
