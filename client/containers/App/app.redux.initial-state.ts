import { History } from 'history';

export interface State {
  route: CurrentRoute;
  locale: string;
  history: History | {};
}

export interface CurrentRoute {
  pageName: string;
  params: any;
  id: string;
}

const state: State = {
  route: {
    id: '',
    pageName: '',
    params: {},
  },
  history: {},
  locale: '',
};

export default state;
