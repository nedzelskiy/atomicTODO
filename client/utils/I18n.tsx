import { Store } from 'redux';
import * as React from 'react';
import * as get from 'get-value';
import { Translations, TranslationsForLocale } from '../../common/interfaces';

const initialTranslationsValue = {};
/* tslint:disable:variable-name */
export const TranslationContext = React.createContext(initialTranslationsValue);
/* tslint:enable:variable-name */

export interface I18nTranslate {
  (id: string, domain?: string, locale?: string): string;
}

interface I18nClass {
  translate: I18nTranslate;
  setTranslationsForLocale: Function;
}

export interface I18nTranslatePropsHelper {
  t: I18nTranslate;
}

export let classInstance: I18nClass;

class I18n implements I18nClass {
  private readonly store: Store;
  private readonly translations: Translations = initialTranslationsValue;

  constructor(store: Store, locale?: string, translationsForLocale?: TranslationsForLocale) {
    classInstance = this;
    this.store = store;
    this.setTranslationsForLocale(locale, translationsForLocale);
  }

  setTranslationsForLocale(
      locale?: string,
      translationsForLocale: TranslationsForLocale = {},
  ): void {
    if (locale) {
      this.translations[locale] = translationsForLocale;
    }
  }

  translate(id: string, domain?: string, locale?: string): string {
    return get(
        this.translations,
        `${locale || this.getCurrentLocale()}.${domain || 'common'}.${id}`,
    ) || id;
  }
// TODO
  getCurrentLocale(): string {
    return 'ru'; // this.store.getState().App.router.lang;
  }
}

const translateHelper = (): I18nTranslate => classInstance.translate.bind(classInstance);

/* tslint:disable:variable-name */
export const withTranslations =
    (Component: React.FunctionComponent<I18nTranslatePropsHelper>): React.FunctionComponent =>
      (props: any): JSX.Element =>
        (
            <TranslationContext.Consumer>
                {() => <Component {...props} t={translateHelper()} />}
            </TranslationContext.Consumer>
        );
/* tslint:enable:variable-name */

export default I18n;
