import { CommonAction } from '../../redux.interfaces';
import sagasEvents from './translations.saga.events';
import { ResponseData } from '../../../server/server';
import { takeEvery, getContext, call } from 'redux-saga/effects';
import { GetTranslationsAction } from './translations.saga.actions';
import BrowserTranslator from '../ClientTranslationsDto/ClientTranslationsDto';
import { getTranslations as getTranslationsRequest } from './translations.saga.http';

function* getTranslations(action: CommonAction & GetTranslationsAction) {
  const { locale } = action.payload;
  try {
    const response: ResponseData = yield getTranslationsRequest(locale);
    const translations = response.data;
    const translator: BrowserTranslator = yield getContext('translator');
    yield call(translator.setTranslations, locale, translations);
  } catch (e) {
    throw e;
  }
}

function* watchGetTranslations() {
  yield takeEvery(sagasEvents.TRANSLATONS__GET_TRANSLATION, getTranslations);
}

export default [
  watchGetTranslations(),
];
