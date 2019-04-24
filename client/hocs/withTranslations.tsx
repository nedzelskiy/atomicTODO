import * as React from 'react';
import I18n from '../../common/helpers/I18n';

export interface I18nTranslate {
  (id: string, domain?: string): string;
}

export interface I18nTranslatePropsHelper {
  t: I18nTranslate;
}

const translateHelper = (i18n: I18n, props: any): I18nTranslate => {
  return i18n.translate.bind(i18n, props.match.params.language);
};

/* tslint:disable:variable-name */
const withTranslations =
  (Component: React.FunctionComponent<I18nTranslatePropsHelper>): React.FunctionComponent =>
    (props: any): JSX.Element =>
      (
        <I18n.context.Consumer>
          {(i18n: I18n) => <Component {...props} t={translateHelper(i18n, props)} />}
        </I18n.context.Consumer>
      );
/* tslint:enable:variable-name */

export default withTranslations;
