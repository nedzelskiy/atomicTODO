import { History } from 'history';

export interface State {
  route: CurrentRoute;
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
};

export default state;
