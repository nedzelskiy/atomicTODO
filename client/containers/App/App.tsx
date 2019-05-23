import * as React from 'react';
import { connect } from 'react-redux';
import {
  SetLocale, setLocale,
  StartLoading, startLoading,
  ChangeLocale, changeLocale,
  SetCurrentRoute, setCurrentRoute,
} from './app.redux.actions';
import { CurrentRoute, PageError } from './app.redux.initial-state';
import { getUrlWithOutLocale } from '../../utils/helpers';
import { AppReducerState } from '../../../data/redux.reducers';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import LoadingPage from '../../pages/LoadingPage/LoadingPage';
import ClientTranslationsDto
  from '../../../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import './app.styles.scss';

interface Props {
  locale: string;
  isLoading: boolean;
  route: CurrentRoute;
  reduxLocale: string;
  pageError: PageError;
  setLocale: SetLocale;
  changeLocale: ChangeLocale;
  startLoading: StartLoading;
  setCurrentRoute: SetCurrentRoute;
  translationsStorage: ClientTranslationsDto;
}

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.setLocale = this.setLocale.bind(this);
    this.setCurrentRoute = this.setCurrentRoute.bind(this);
    this.updateReduxStateBeforeRender();
  }

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const oldLocale: string = this.props.locale;
    const newLocale: string = nextProps.locale;
    const oldUrl = getUrlWithOutLocale(oldLocale, this.props.route.url);
    const newUrl = getUrlWithOutLocale(newLocale, nextProps.route.url);
    if (oldLocale !== newLocale) {
      if (this.props.translationsStorage.isExistTranslations(newLocale)) {
        this.setLocale(newLocale);
      } else {
        this.props.startLoading();
        this.props.changeLocale(newLocale);
      }
    }
    return (
      oldUrl !== newUrl
      || this.props.reduxLocale !== nextProps.reduxLocale
      || this.props.isLoading !== nextProps.isLoading
    );
  }

  updateReduxStateBeforeRender() {
    this.setCurrentRoute();
    this.setLocale(this.props.locale);
  }

  componentDidUpdate(): void {
    this.setCurrentRoute();
    // this.props.changeLocale('sx');
  }

  setLocale(locale: string) {
    // this.props.setLocale(locale);
  }

  setCurrentRoute() {
    this.props.setCurrentRoute(this.props.route);
  }

  render() {
    // console.log('>> rerender App', this.props);
    // if (!this.props.reduxLocale) {
    //   return null;
    // }

    if (this.props.isLoading) {
      return <LoadingPage/>;
    }
    if (this.props.pageError.isError && this.props.pageError.message) {
      return <ErrorPage message={this.props.pageError.message}/>;
    }
    return this.props.children;
  }
}

export default connect(
  (state: AppReducerState) => {
    return {
      reduxLocale: state.appReducer.locale,
      pageError: state.appReducer.pageError,
      isLoading: state.appReducer.isLoading,
    };
  },
  {
    setLocale,
    startLoading,
    changeLocale,
    setCurrentRoute,
  },
)(App);
