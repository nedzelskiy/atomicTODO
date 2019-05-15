import * as React from 'react';
import { connect } from 'react-redux';
import { AppReducerState } from '../../../data/redux.reducers';
import { TranslateHelper } from '../../../data/translations/trnaslations.interfaces';
import ClientTranslationsDto
  from '../../../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import ClientTranslator from '../../../data/translations/ClientTranslator/ClientTranslator';

let translationsStorage = new ClientTranslationsDto();

export const getTranslationsStorage = (): ClientTranslationsDto => translationsStorage;
export const setTranslationsStorage = (ts: ClientTranslationsDto) => {
  translationsStorage = ts;
};

export interface TranslateHelperProps {
  t: TranslateHelper;
}

const createTranslator = (locale: string): TranslateHelper => {
  return new ClientTranslator(
    translationsStorage.getTranslations(locale),
  ).getTranslator();
};

export default (Component: React.FunctionComponent<any> | React.ComponentClass<any, any>) => {
  const WithTranslator = (props: any): JSX.Element => {
    return (
      <Component {...props} t={createTranslator(props.locale)}/>
    );
  };

  return connect(
    (state: AppReducerState) => {
      return {
        locale: state.appReducer.locale,
      };
    },
    {},
  )(WithTranslator);
};
