export interface State {
  locale: string;
  loading: object;
  route: CurrentRoute;
  pageError: PageError;
}

export interface PageError {
  code?: number;
  message: string;
  isError: boolean;
}

export interface CurrentRoute {
  id: string;
  url: string;
  params: any;
  pageName: string;
}

const state: State = {
  locale: '',
  loading: {},
  route: {
    id: '',
    url: '',
    pageName: '',
    params: {},
  },
  pageError: {
    isError: false,
    message: '',
  },
};

export default state;
