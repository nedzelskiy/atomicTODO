import ResponseBody from '../ResponseBody';
import ReactTranslator
    from '../../../../../data/translations/BrowsersTranslator/bindings/ReactTranslator';
import BrowsersTranslator
  from '../../../../../data/translations/BrowsersTranslator/BrowsersTranslator';
import configureStore from '../../../../../client/configureStore';
import connectedToRealFsTranslator
  from '../../../../../data/translations/ServerTranslator/bindings/connectedToRealFsTranslator';
import { NormalizedIncomingMessage } from '../../../server';

export const createReactResponse = (req: NormalizedIncomingMessage) => {
  return new ResponseBody(
    configureStore({}, {}),
    new BrowsersTranslator(),
    connectedToRealFsTranslator,
    req,
  );
};
