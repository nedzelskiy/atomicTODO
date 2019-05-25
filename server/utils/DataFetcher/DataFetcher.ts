import * as upath from 'upath';
import { reflect } from '../helpers';

interface ReduxInstructions {
  fetch(): any;
}

class DataFetcher implements ReduxInstructions{
  private dataFetchJobs = [];
  private readonly dataFetchComponents: string[] = [];

  private collectFetchJobs() {
    this.dataFetchComponents.forEach((url: string) => {
      const u = upath.normalize(url.split('.').shift() as string);
      this.dataFetchJobs =
        this.dataFetchJobs.concat(require(`../../../client/${u}`).serverDataFetchJobs);
    });
  }

  constructor(
    dataFetchComponents: string[],
  ) {
    this.dataFetchComponents = dataFetchComponents;
    this.collectFetchJobs();
  }

  async fetch() {
    return Promise.all(this.dataFetchJobs.map(reflect));
  }
}

export default DataFetcher;
