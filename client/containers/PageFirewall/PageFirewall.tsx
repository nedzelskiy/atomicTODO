import * as React from 'react';
import { connect } from 'react-redux';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import { PageError } from '../App/app.redux.initial-state';
import LoadingPage from '../pages/LoadingPage/LoadingPage';
import { AppReducerState } from '../../../data/redux.reducers';

interface Props {
  isLoading: boolean;
  pageError: PageError;
}

class PageFirewall extends React.Component<Props, {}> {
  render() {
    const {  isLoading } = this.props;
    const { isError, message } = this.props.pageError;
    if (isError && message) {
      return <ErrorPage message={message}/>;
    }
    if (isLoading) {
      return <LoadingPage />;
    }
    return this.props.children;
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
)(PageFirewall);
