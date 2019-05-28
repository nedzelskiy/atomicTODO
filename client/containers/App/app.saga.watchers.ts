import appEvents from './app.redux.events';
import { ResponseData } from '../../../server/interfaces';
import { STORAGE_NAME } from '../decorators/withTranslator';
import { CommonAction } from '../../../data/redux.interfaces';
import { getTranslations } from '../../../data/translations/http';
import { takeEvery, getContext, call, put } from 'redux-saga/effects';
import ClientTranslationsDto
  from '../../../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import {
  setLocale,
  stopLoading,
  startLoading,
  setPageError,
  GetLocaleAction,
} from './app.redux.actions';

function* getLocale(action: CommonAction & GetLocaleAction) {
  try {
    yield put(startLoading());
    const { locale } = action.payload;
    const response: ResponseData = yield getTranslations(locale);
    if (!response.success) {
      throw response.error;
    }
    const translationsStorage: ClientTranslationsDto = yield getContext(STORAGE_NAME);
    yield call(translationsStorage.setTranslations, locale, response.data);
    yield put(setLocale(locale));
    yield put(stopLoading());
  } catch (e) {
    const message = e.response && e.response.data && e.response.data.error
      ? e.response.data.error.toString()
      : e.response.statusText;
    const code = e.response && e.response.status
      ? e.response.status
      : null;
    yield put(setPageError({
      code,
      message,
      isError: true,
    }));
    yield put(stopLoading());
    throw e;
  }
}

function* watchGetLocale() {
  yield takeEvery(appEvents.APP__GET_LOCALE, getLocale);
}

export default [
  watchGetLocale(),
];
