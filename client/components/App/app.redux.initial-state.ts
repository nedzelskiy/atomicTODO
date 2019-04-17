export interface I18nValue {
  [propName: string]: string;
}

export interface State {
  i18n: Map<any, I18nValue>;
}

export default <State>{
  i18n: new Map(),
};
