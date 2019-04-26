import * as React from 'react';
import { withRouter } from 'react-router';
import I18n from '../../common/helpers/I18n';

interface I18nTranslator {
  (id: string, domain?: string): string;
}

export interface I18nTranslatePropsHelper {
  t: I18nTranslator;
}

const translateHelper = (i18n: I18n, props: any): I18nTranslator => {
  return i18n.translate.bind(i18n, props.match.params.language);
};

/* tslint:disable:variable-name */
const withTranslations: any =
  (Component: any): React.FunctionComponent<any> => {
    return (props: any): JSX.Element =>
      (
        <I18n.context.Consumer>
          {(i18n: I18n) => <Component {...props} t={translateHelper(i18n, props)}/>}
        </I18n.context.Consumer>
      );
  };
/* tslint:enable:variable-name */

export default (component: any): any => {
  return withRouter(withTranslations(component));
};
