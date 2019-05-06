import { renderToStaticMarkup } from 'react-dom/server';
import ResponseBodyCreator from '../ResponseBodyCreator';
import BrowsersTranslator
  from '../../../../../data/translations/BrowsersTranslator/BrowsersTranslator';
import configureStore from '../../../../../client/configureStore';
import connectedToRealFsTranslator
  from '../../../../../data/translations/ServerTranslator/bindings/connectedToRealFsTranslator';
import { NormalizedIncomingMessage } from '../../../server';

export const getResponseBodyCreator = (
  req: NormalizedIncomingMessage,
): ResponseBodyCreator => {
  return new ResponseBodyCreator(
    configureStore({}, {}),
    new BrowsersTranslator(),
    connectedToRealFsTranslator,
    renderToStaticMarkup,
    req,
  );
};
