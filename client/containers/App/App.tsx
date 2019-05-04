import * as React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router';
import I18n from '../../../common/helpers/I18n';
import appRoutes, { ReactRoute, HomeRouteParams } from './app.routes';
import './app.styles.scss';

interface Props {
  i18n: I18n;
}

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.renderRoute = this.renderRoute.bind(this);
    this.renderRouteComponent = this.renderRouteComponent.bind(this);
  }

  renderRouteComponent(route: ReactRoute, props: RouteComponentProps) {
    const Component: React.FunctionComponent<any> | React.ComponentClass<any, any> =
      route.getComponent();
    const { params } = props.match;
    return (
      <I18n.context.Provider value={{
        i18n: this.props.i18n,
        lang: (params as HomeRouteParams).language,
      }}>
        <Component/>
      </I18n.context.Provider>
    );
  }

  renderRoute(route: ReactRoute) {
    return <Route
      {...route}
      key={route.pageName}
      render={(props) => {
        return this.renderRouteComponent(route, props);
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
