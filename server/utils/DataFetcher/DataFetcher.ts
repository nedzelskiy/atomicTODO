import * as upath from 'upath';
import { reflect } from '../helpers';
import Environment from '../Environment/Environment';
import { CommonAction } from '../../../data/redux.interfaces';

interface ReduxInstructions {
  getReduxInstructions(): CommonAction[];
}

class DataFetcher implements ReduxInstructions{
  private dataFetchJobs = [];
  private readonly env: Environment;
  private readonly dataFetchComponents = {};

  private collectFetchJobs() {
    const route = this.env.getMatchedRouteWithParams();
    Object.keys(this.dataFetchComponents).forEach((pageName) => {
      if (route.pageName !== pageName.toLowerCase()) {
        return;
      }
      this.dataFetchComponents[pageName].forEach((url: string) => {
        const u = upath.normalize(url.split('.').shift() as string);
        this.dataFetchJobs =
          this.dataFetchJobs.concat(require(`../../../client/${u}`).serverDataFetchJobs);
      });
    });
  }

  constructor(
    env: Environment,
    dataFetchComponents: object,
  ) {
    this.env = env;
    this.dataFetchComponents = dataFetchComponents;
    this.collectFetchJobs();
  }

  async getReduxInstructions() {
    const reduxInstructions: CommonAction[] = await Promise.all(this.dataFetchJobs.map(reflect));
    return reduxInstructions;
  }
}

export default DataFetcher;
