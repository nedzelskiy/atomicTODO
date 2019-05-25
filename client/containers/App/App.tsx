import * as React from 'react';
import { connect } from 'react-redux';
import Error from '../../pages/Error/Error';
import { PageError } from './app.redux.initial-state';
import Loading from '../overlays/Loading/Loading';
import { AppReducerState } from '../../../data/redux.reducers';
import './app.styles.scss';

interface Props {
  isLoading: boolean;
  pageError: PageError;
}

class App extends React.Component<Props, {}> {
  render() {
    const {  isLoading } = this.props;
    const { isError, message } = this.props.pageError;
    if (isError && message) {
      return <Error message={message}/>;
    }
    return (
      <React.Fragment>
        { isLoading ? <Loading /> : null }
        { this.props.children}
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
