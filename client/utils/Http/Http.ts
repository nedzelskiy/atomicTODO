import axios from 'axios/index';
import { AxiosPromise } from 'axios';

class Http {
  private createGetRequest(url: string, params: any): AxiosPromise<any> {
    return axios
      .create({
        params,
      })
      .get(url)
      .then((response) => {
        return response.data;
      });
  }
}

export default Http;
