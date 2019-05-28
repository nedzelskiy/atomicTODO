import * as React from 'react';
import { connect } from 'react-redux';
import Error from '../../pages/Error/Error';
import Loading from '../overlays/Loading/Loading';
import { PageError } from './app.redux.initial-state';
import AppPortal from '../portals/AppPortal/AppPortal';
import { AppReducerState } from '../../../data/redux.reducers';
import './app.styles.scss';

interface Props {
  isLoading: boolean;
  pageError: PageError;
}

class App extends React.Component<Props, {}> {
  renderAppPortal() {
    if (this.props.isLoading) {
      return (
        <AppPortal>
          <Loading />
        </AppPortal>
      );
    }
    return null;
  }

  render() {
    const { isError, message, code } = this.props.pageError;
    if (isError && message) {
      return <Error message={message} code={code} />;
    }
    return (
      <React.Fragment>
        {this.renderAppPortal()}
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default connect(
  (state: AppReducerState) => {
    return {
      pageError: state.appReducer.pageError,
      isLoading: state.appReducer.isLoading,
    };
  },
  {},
)(App);
