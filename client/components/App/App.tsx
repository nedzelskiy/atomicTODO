import * as React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router';
import I18n from '../../../common/helpers/I18n';
import appRoutes, { ReactRoute } from './app.routes';
import './app.styles.scss';

interface Props {
  i18n: I18n;
}

class App extends React.Component<Props> {
  static renderRouteComponent(route: ReactRoute, props: RouteComponentProps, appProps: Props) {
    const Component: React.FunctionComponent<any> | React.ComponentClass<any, any> =
      route.getComponent();
    const { i18n } = appProps;
    return (
      <I18n.context.Provider value={{
        i18n,
        lang: (props.match.params as any).language,
      }}>
        <Component/>
      </I18n.context.Provider>
    );
  }

  constructor(props: Props) {
    super(props);
    this.renderRoute = this.renderRoute.bind(this);
  }

  renderRoute(route: ReactRoute) {
    return <Route
      {...route}
      key={route.pageName}
      render={(props) => {
        return App.renderRouteComponent(route, props, this.props);
      }}
    />;
  }

  render() {
    return [
      <Switch key="switch">
        {appRoutes.map(this.renderRoute)}
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
