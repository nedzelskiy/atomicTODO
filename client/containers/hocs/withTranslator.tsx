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

interface Props {
  locale: string;
}

const createTranslator = (locale: string) => {
  return new ClientTranslator(
        translationsStorage.getTranslations(locale),
      ).getTranslator();
};

export default (Component: React.FunctionComponent<any> | React.ComponentClass<any, any>) => {
  class WithTranslator extends React.Component<Props, {}> {
    constructor(props: Props) {
      super(props);
      this.createTranslator = this.createTranslator.bind(this);
    }

    createTranslator(): TranslateHelper {
      return new ClientTranslator(
        translationsStorage.getTranslations(this.props.locale),
      ).getTranslator();
    }

    render() {
      const newProps = {
        ...this.props,
      };
      delete newProps.locale;
      return <Component {...newProps} t={this.createTranslator()}/>;
    }
  }

  return connect(
    (state: AppReducerState) => {
      return {
        locale: state.appReducer.locale,
      };
    },
    {},
    )(WithTranslator);
};
