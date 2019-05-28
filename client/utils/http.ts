import axios from 'axios/index';

export const getRequest = (url: string, params: any = {}): Promise<void | object> => {
  return axios.get(url, {
    params,
  })
  .then((response) => {
    return response.data;
  });
};
