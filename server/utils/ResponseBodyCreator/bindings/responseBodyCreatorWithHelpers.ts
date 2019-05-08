import ResponseBodyCreator from '../ResponseBodyCreator';
import { NormalizedIncomingMessage } from '../../../server';
import Environment from '../../Environment/Environment';
import EnvironmentWithRoutes from '../../Environment/bindings/withRoutes';
import withFilesFromRealFs
  from '../../../../data/translations/TranslatorsConnector/bindings/withFilesFromRealFs';

export const getResponseBodyCreator = (
  req: NormalizedIncomingMessage,
): ResponseBodyCreator => {
  return new ResponseBodyCreator(
    Environment.getLocaleFromReq(req),
    EnvironmentWithRoutes.getMatchedRouteWithParams(req.url),
    withFilesFromRealFs,
  );
};
