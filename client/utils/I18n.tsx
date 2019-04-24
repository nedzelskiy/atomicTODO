import * as React from 'react';
import * as get from 'get-value';
import { Translations, TranslationsForLocale } from '../../common/interfaces';

const initialTranslationsValue = {};
/* tslint:disable:variable-name */
export const TranslationContext = React.createContext(initialTranslationsValue);
/* tslint:enable:variable-name */

export interface I18nTranslate {
  (id: string, domain?: string): string;
}

export interface I18nTranslatePropsHelper {
  t: I18nTranslate;
}

class I18n {
  private readonly translations: Translations = initialTranslationsValue;

  constructor(locale: string, translationsForLocale: TranslationsForLocale) {
    this.setTranslationsForLocale(locale, translationsForLocale);
  }

  setTranslationsForLocale(locale: string, translationsForLocale: TranslationsForLocale): void {
    if (locale) {
      this.translations[locale] = translationsForLocale;
    }
  }

  translate(locale: string, id: string, domain?: string): string {
    return get(
        this.translations,
        `${locale}.${domain || 'common'}.${id}`,
    ) || id;
  }
}

const translateHelper = (i18n: I18n, props: any): I18nTranslate => {
  return i18n.translate.bind(i18n, props.match.params.language);
};

/* tslint:disable:variable-name */
export const withTranslations =
    (Component: React.FunctionComponent<I18nTranslatePropsHelper>): React.FunctionComponent =>
      (props: any): JSX.Element =>
        (
            <TranslationContext.Consumer>
                {(i18n: I18n) => <Component {...props} t={translateHelper(i18n, props)} />}
            </TranslationContext.Consumer>
        );
/* tslint:enable:variable-name */

export default I18n;
