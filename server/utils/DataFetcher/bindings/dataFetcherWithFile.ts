import DataFetcher from '../DataFetcher';
import Environment from '../../Environment/Environment';

export default new DataFetcher(
  require(`../../../../build/client/${Environment.fileNameOfNeededInServerData}`),
);
