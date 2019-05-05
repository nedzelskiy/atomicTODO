import * as React from 'react';
import ReactTranslator, { TranslateHelper }
  from '../../../data/translations/BrowsersTranslator/bindings/ReactTranslator';

export const i18nContext: React.Context<{}> = React.createContext({});

export interface TranslateHelperProp {
  t: TranslateHelper;
}

const createTranslateHelper =
  (translator: ReactTranslator, locale: string): TranslateHelper => {
    translator.setLocale(locale);
    return translator.translate;
  };

export default (Component: React.FunctionComponent<any> | React.ComponentClass<any, any>) => {
  const WithTranslations = (props: any): JSX.Element =>
    (
      <i18nContext.Consumer>
        {({ translator, locale }: {translator: ReactTranslator; locale: string }) =>
          <Component {...props} t={createTranslateHelper(translator, locale)}/>}
      </i18nContext.Consumer>
    );
  return WithTranslations;
};
