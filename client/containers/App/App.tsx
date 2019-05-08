import * as React from 'react';
import { connect } from 'react-redux';
import { HomeRouteParams } from './app.routes';
import { i18nContext } from '../hocs/withTranslations';
import BrowserTranslator from '../../../data/translations/BrowserTranslator/BrowserTranslator';
import { getTranslations, GetTranslations }
  from '../../../data/translations/sagas/translations.saga.actions';
import './app.styles.scss';

interface Props {
  translator: BrowserTranslator;
  getTranslations: GetTranslations;
  routerParams: HomeRouteParams | any;
  component: React.FunctionComponent<any> | React.ComponentClass<any, any>| React.ReactElement;
}

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.isExistTranslations = this.isExistTranslations.bind(this);
  }

  componentDidMount(): void {
    BrowserTranslator.subscribeToUpdateTranslations(() => {
      this.forceUpdate();
    });
  }

  componentWillUpdate(nextProps: Readonly<Props>) {
    const oldLocale: string = this.props.routerParams.locale;
    const newLocale: string = nextProps.routerParams.locale;
    if (newLocale !== oldLocale && !this.isExistTranslations(newLocale)) {
      this.props.getTranslations(newLocale);
    }
  }

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const oldLocale: string = this.props.routerParams.locale;
    const newLocale: string = nextProps.routerParams.locale;
    return newLocale !== oldLocale;
  }

  isExistTranslations(locale: string): boolean {
    return this.props.translator.isExistTranslations(locale);
  }

  render() {
    const Component: any = this.props.component;
    return (
      <i18nContext.Provider value={{
        locale: this.props.routerParams.locale,
        translator: this.props.translator,
      }}>
        <Component {...this.props} />
      </i18nContext.Provider>
    );
  }
}

export default connect(null, { getTranslations })(App);
