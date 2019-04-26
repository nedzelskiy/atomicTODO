import * as React from 'react';
import I18n from '../../common/helpers/I18n';

interface I18nTranslator {
  (id: string, domain?: string): string;
}

export interface I18nTranslatePropsHelper {
  t: I18nTranslator;
}

const translateHelper = (i18n: I18n): I18nTranslator => {
  return i18n.translate.bind(i18n, i18n.getRouterParam('language'));
};

const withTranslations =
  (Component: React.FunctionComponent<any> | React.ComponentClass<any, any>) => {
    const WithTranslations = (props: any): JSX.Element =>
      (
        <I18n.context.Consumer>
          {(i18n: I18n) => <Component {...props} t={translateHelper(i18n)}/>}
        </I18n.context.Consumer>
      );
    return WithTranslations;
  };

export default withTranslations;
