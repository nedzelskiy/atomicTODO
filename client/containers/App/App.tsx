import * as React from 'react';
import { connect } from 'react-redux';
import { i18nContext } from '../hocs/withTranslations';
import { ClientTranslationsForLocale }
  from '../../../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import { storePageParams, StorePageParams } from './app.redux.actions';
import { CurrentRoute } from './app.redux.initial-state';
import './app.styles.scss';

interface Props {
  storePageParams: StorePageParams;
  locale: string;
  history: History | {};
  route: CurrentRoute;
  translations: ClientTranslationsForLocale;
}

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.storePageParams = this.storePageParams.bind(this);
  }

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const oldLocale: string = this.props.locale;
    const newLocale: string = nextProps.locale;
    return newLocale !== oldLocale;
  }

  componentDidMount() {
    this.storePageParams();
  }

  componentDidUpdate() {
    this.storePageParams();
  }

  storePageParams() {
    this.props.storePageParams(this.props.route, this.props.history);
  }

  render() {
    return (
      <i18nContext.Provider value={this.props.translations}>
        {this.props.children}
      </i18nContext.Provider>
    );
  }
}

export default connect(null, { storePageParams })(App);
