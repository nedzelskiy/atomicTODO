import * as React from 'react';
import { TranslateHelper } from '../../../data/translations/trnaslations.interfaces';
import ClientTranslator from '../../../data/translations/ClientTranslator/ClientTranslator';

export const i18nContext: React.Context<TranslateHelper> = React.createContext(
  new ClientTranslator({}).getTranslator()
);

export interface TranslateHelperProps {
  t: TranslateHelper;
}

export default (Component: React.FunctionComponent<any> | React.ComponentClass<any, any>) => {
  const WithTranslations = (props: any): JSX.Element =>
    (
      <i18nContext.Consumer>
        {(translateHelper: TranslateHelper) => {
          console.log('render i18n consumer');
          return (<Component
            t={translateHelper}
          />);
        }}
      </i18nContext.Consumer>
    );
  return WithTranslations;
};
