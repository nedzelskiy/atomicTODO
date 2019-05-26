import * as upath from 'upath';
import { ErrorCheckedPromiseResult, reflect } from '../helpers';

interface ReflectedPromiseResult {
  fetch(): Promise<ErrorCheckedPromiseResult[]>;
}

class DataFetcher implements ReflectedPromiseResult {
  private dataFetchJobs = [];
  private readonly dataFetchComponents: string[] = [];

  private collectFetchJobs(): void {
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

  async fetch(): Promise<ErrorCheckedPromiseResult[]> {
    return Promise.all(this.dataFetchJobs.map(reflect));
  }
}

export default DataFetcher;
