import * as React from 'react';
import BrowsersTranslator
  from '../../../data/translations/BrowsersTranslator/BrowsersTranslator';

export type TranslateHelper = (id: string, domain?: string) => string;

export const i18nContext: React.Context<{}> = React.createContext({});

export interface TranslateHelperProps {
  t: TranslateHelper;
}

const createTranslateHelper =
  (translator: BrowsersTranslator, locale: string): TranslateHelper => {
    return translator.translate.bind(this, locale);
  };

export default (Component: React.FunctionComponent<any> | React.ComponentClass<any, any>) => {
  const WithTranslations = (props: any): JSX.Element =>
    (
      <i18nContext.Consumer>
        {({ translator, locale }: { translator: BrowsersTranslator; locale: string }) =>
          <Component
            {...props}
            t={createTranslateHelper(translator, locale)}
          />
        }
      </i18nContext.Consumer>
    );
  return WithTranslations;
};
