import { History } from 'history';

export interface State {
  route: CurrentRoute;
  locale: string;
  history: History | {};
}

export interface CurrentRoute {
  pageName: string;
  params: any;
}

const state: State = {
  route: {
    pageName: '',
    params: {},
  },
  history: {},
  locale: '',
};

export default state;
