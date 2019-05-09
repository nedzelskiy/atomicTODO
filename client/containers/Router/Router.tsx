import * as React from 'react';
import { HomeRouteParams, ReactRoute } from '../App/app.routes';
import { BrowserRouter, Route, RouteComponentProps, Switch } from 'react-router-dom';

interface Props {
  routes: ReactRoute[];
  render: (routerProps: RouterProps, route: ReactRoute) => React.ReactNode;
}

export interface RouterProps extends RouteComponentProps<HomeRouteParams> {}

class Router extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.renderRoute = this.renderRoute.bind(this);
  }

  renderRoute(route: ReactRoute) {
    return (
      <Route
        {...route}
        key={route.pageName}
        render={(routerProps: RouterProps) => {
          return this.props.render(routerProps, route);
        }}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {this.props.routes.map(this.renderRoute)}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
