import * as React from 'react';
import { TranslateHelper } from
    '../../../../data/translations/trnaslations.interfaces';
import ClientTranslator from '../../../../data/translations/ClientTranslator/ClientTranslator';
import ClientTranslationsDto
  from '../../../../data/translations/ClientTranslationsDto/ClientTranslationsDto';

interface Props {
  locale: string;
  translationsStorage: ClientTranslationsDto;
  children: any;
}

export const Context: React.Context<TranslateHelper> = React.createContext(
  new ClientTranslator({}).getTranslator(),
);

class WithTranslationsProvider extends React.Component<Readonly<Props>, {}> {
  constructor(props: Props) {
    super(props);
    this.getHelper = this.getHelper.bind(this);
  }

  getHelper(): TranslateHelper {
    const { locale, translationsStorage } = this.props;
    return new ClientTranslator(
        translationsStorage.getTranslations(locale),
      ).getTranslator();
  }

  componentWillUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): void {
    console.log('qwert', nextProps.children === this.props.children);
  }

  render() {
    return (
      <Context.Provider value={this.getHelper()}>
        {this.props.children()}
      </Context.Provider>
    );
  }
}

export default WithTranslationsProvider;
