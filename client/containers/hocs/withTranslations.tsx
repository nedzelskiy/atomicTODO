import * as React from 'react';
import { ClientTranslationsForLocale }
  from '../../../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import { TranslateHelper } from '../../../data/translations/trnaslations.interfaces';
import ClientTranslator from '../../../data/translations/ClientTranslator/ClientTranslator';

export const i18nContext: React.Context<ClientTranslationsForLocale> = React.createContext({});

export interface TranslateHelperProps {
  t: TranslateHelper;
}

export default (Component: React.FunctionComponent<any> | React.ComponentClass<any, any>) => {
  const WithTranslations = (props: any): JSX.Element =>
    (
      <i18nContext.Consumer>
        {(translations: ClientTranslationsForLocale) =>
          <Component
            {...props}
            t={new ClientTranslator(translations).getTranslator()}
          />
        }
      </i18nContext.Consumer>
    );
  return WithTranslations;
};
