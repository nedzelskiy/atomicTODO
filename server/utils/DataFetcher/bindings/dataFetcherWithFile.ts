import DataFetcher from '../DataFetcher';
import configureStore from '../../../../client/configureStore';

export default new DataFetcher(
  configureStore({}, {}),
  require('../../../../build/client/inDataNeeded'),
);
