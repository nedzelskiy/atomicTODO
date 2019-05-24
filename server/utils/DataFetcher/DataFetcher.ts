import * as upath from 'upath';
import { reflect } from '../helpers';
import Environment from '../Environment/Environment';

interface ReduxInstructions {
  getReduxInstructions(): any;
}

class DataFetcher implements ReduxInstructions{
  private dataFetchJobs = [];
  private readonly env: Environment;
  private readonly dataFetchComponents = {};

  private collectFetchJobs() {
    const route = this.env.getMatchedRouteWithParams();
    Object.keys(this.dataFetchComponents).forEach((pageName) => {
      console.log(this.dataFetchComponents, route.pageName, pageName.toLowerCase());
      if (route.pageName !== pageName.toLowerCase()) {
        return;
      }
      this.dataFetchComponents[pageName].forEach((url: string) => {
        const u = upath.normalize(url.split('.').shift() as string);
        console.log(u)
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
    const reduxInstructions: any =
      await Promise.all(this.dataFetchJobs.map(reflect));
    console.log(reduxInstructions, 's')
    return reduxInstructions;
  }
}

export default DataFetcher;
