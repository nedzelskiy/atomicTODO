import * as path from 'upath';
import { Store } from 'redux';

interface StoreFiller {
  getFilledStore(): Store;
}

class DataFetcher implements StoreFiller {
  private dataFetchJobs = [];
  private readonly dataFetchComponents = {};
  private readonly store: Store;

  constructor(store: Store, dataFetchComponents: object) {
    this.store = store;
    this.dataFetchComponents = dataFetchComponents;
  }

  getFilledStore(): Store {
    return this.store;
  }

  collectFetchJobs() {
    Object.keys(this.dataFetchComponents).forEach((url) => {
      if (!this.dataFetchComponents[url]) {
        return;
      }
      const u = path.normalize(url.split('.').shift() as string);
      this.dataFetchJobs =
        this.dataFetchJobs.concat(require(`../../../client${u}`).serverDataFetchJobs);
    });
    console.log(this.dataFetchJobs);
  }
}

export default DataFetcher;
