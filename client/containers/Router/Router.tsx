import * as React from 'react';
import { BrowserRouter, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { ApplicationRoute, ApplicationRoutes, HomeRouteParams } from './interfaces';

interface Props {
  routes: ApplicationRoutes;
  render: (
    routerProps: RouterProps,
    route: ApplicationRoute,
    routeId: string,
  ) => React.ReactNode;
}

export interface RouterProps extends RouteComponentProps<HomeRouteParams> {}

class Router extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.renderRoute = this.renderRoute.bind(this);
  }

  renderRoute(route: ApplicationRoute, id: string) {
    return (
      <Route
        {...route}
        key={route.pageName}
        render={(routerProps: RouterProps) => {
          return this.props.render(routerProps, route, id);
        }}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {Object.keys(this.props.routes).map((id) => {
            return this.renderRoute(this.props.routes[id], id);
          })}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
