import * as React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router';
import { i18nContext } from '../hocs/WithTranslations';
import appRoutes, { ReactRoute, HomeRouteParams } from './app.routes';
import './app.styles.scss';
import ReactTranslator
  from '../../../data/translations/BrowsersTranslator/bindings/ReactTranslator';

interface Props {
  translator: ReactTranslator;
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
      <i18nContext.Provider value={{
        translator: this.props.translator,
        locale: (params as HomeRouteParams).locale,
      }}>
        <Component/>
      </i18nContext.Provider>
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
