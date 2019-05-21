import * as path from 'upath';

class DataFetcher {
  private dataFetchJobs = [];
  private readonly dataFetchComponents = {};

  constructor(dataFetchComponents: object) {
    this.dataFetchComponents = dataFetchComponents;
  }

  collectFetchJobs() {
    Object.keys(this.dataFetchComponents).forEach((url) => {
      const u = path.normalize(url.split('.').shift() as string);
      this.dataFetchJobs = require(`../../../client/${u}`).serverDataFetchJobs;
    });
  }
}

export default DataFetcher;
