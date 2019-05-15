export interface State {
  isLoading: boolean;
  pageError: PageError;
  route: CurrentRoute;
  locale: string;
}

export interface PageError {
  isError: boolean;
  message: string;
  code?: number;
}

export interface CurrentRoute {
  id: string;
  url: string;
  pageName: string;
  params: any;
}

const state: State = {
  pageError: {
    isError: false,
    message: '',
  },
  isLoading: false,
  route: {
    id: '',
    url: '',
    pageName: '',
    params: {},
  },
  locale: '',
};

export default state;
