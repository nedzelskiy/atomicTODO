import DataFetcher from '../DataFetcher';
import Environment from '../../Environment/Environment';
import configureStore from '../../../../client/configureStore';

export default new DataFetcher(
  configureStore({}, {}),
  require(`../../../../build/client/${Environment.fileNameOfNeededInServerData}`),
);
