import * as React from 'react';
import { HomeRouteParams } from './app.routes';
import { i18nContext } from '../hocs/withTranslations';
import { ClientTranslationsForLocale }
  from '../../../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import './app.styles.scss';

interface Props {
  translations: ClientTranslationsForLocale;
  routerParams: HomeRouteParams | any;
}

class App extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const oldLocale: string = this.props.routerParams.locale;
    const newLocale: string = nextProps.routerParams.locale;
    return newLocale !== oldLocale;
  }

  render() {
    return (
      <i18nContext.Provider value={this.props.translations}>
        {this.props.children}
      </i18nContext.Provider>
    );
  }
}

export default App;
