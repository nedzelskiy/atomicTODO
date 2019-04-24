import { IncomingMessage } from 'http';

export interface Action {
  type: string;
  payload: any;
}

export interface PureStringJson {
  [propName: string]: string;
}

export interface Translations {
  [locale: string]: TranslationsForLocale;
}

export interface TranslationsForLocale {
  [domain: string]: PureStringJson;
}

export interface NormalizedIncomingMessage extends IncomingMessage {
  url: string;
}
